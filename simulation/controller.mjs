import { buildObservation, conjugate, motionField, rotate } from "./observations.mjs";

export const PUSH_FORCE = Object.freeze([160, 50, 0]); // World-space newtons.

export class Controller {
  constructor(mj, model, data, config) {
    Object.assign(this, { mj, model, data, config });
    this.rootId = mj.mj_name2id(model, 1, config.rootBody); // mjOBJ_BODY
    this.anchorId = mj.mj_name2id(model, 1, config.anchorBody);
    this.gyroId = mj.mj_name2id(model, 20, "torso_gyro"); // mjOBJ_SENSOR
    this.upId = mj.mj_name2id(model, 20, "pelvis_upvector");
    if ([this.rootId, this.anchorId, this.gyroId, this.upId].some(id => id < 0)) throw new Error("G1 scene sensors are missing.");
    this.gyroAddress = model.sensor_adr[this.gyroId];
    this.upAddress = model.sensor_adr[this.upId];
    this.trackedIds = config.trackedBodyNames.map(name => mj.mj_name2id(model, 1, name));
    this.lastAction = new Float32Array(config.actionDim);
    this.frame = 0;
    this.resets = 0;
    this.pushSteps = 0;
  }
  setMotion(motion, spec) { this.motion = motion; this.spec = spec; this.resets = 0; this.reset(); }
  field(name, frame = this.frame) { return motionField(this.motion, this.spec, frame, name); }
  reset() {
    this.mj.mj_resetData(this.model, this.data);
    this.frame = 0;
    this.pushSteps = 0;
    this.lastAction.fill(0);
    const d = this.data;
    d.qpos.set(this.field("rootPosition"), 0);
    d.qpos.set(this.field("rootQuaternion"), 3);
    d.qpos.set(this.field("jointPosition"), 7);
    d.qvel.set(this.field("rootLinearVelocity"), 0);
    d.qvel.set(rotate(conjugate(this.field("rootQuaternion")), this.field("rootAngularVelocity")), 3);
    d.qvel.set(this.field("jointVelocity"), 6);
    d.ctrl.set(this.config.defaultJointPosition);
    d.xfrc_applied.fill(0);
    this.mj.mj_forward(this.model, d);
  }
  state() {
    const d = this.data;
    return {
      rootPosition: d.xpos.slice(this.rootId * 3, this.rootId * 3 + 3),
      rootQuaternion: d.xquat.slice(this.rootId * 4, this.rootId * 4 + 4),
      gyro: d.sensordata.slice(this.gyroAddress, this.gyroAddress + 3),
      upVector: d.sensordata.slice(this.upAddress, this.upAddress + 3),
      jointPosition: d.qpos.slice(7), jointVelocity: d.qvel.slice(6)
    };
  }
  observation() { return buildObservation(this.state(), this.motion, this.spec, this.config, this.frame, this.lastAction); }
  push() { this.pushSteps = 15; } // 100 ms at 150 Hz.
  step(action) {
    if (action.length !== this.config.actionDim || !action.every(Number.isFinite)) throw new Error("Policy returned invalid actions.");
    const d = this.data;
    // One control-step delay: the new action becomes next step's target.
    for (let i = 0; i < action.length; i++) d.ctrl[i] = this.config.defaultJointPosition[i] + this.config.actionScale * this.lastAction[i];
    this.lastAction.set(action);
    for (let step = 0; step < 3; step++) {
      for (let axis = 0; axis < 3; axis++) d.xfrc_applied[this.rootId * 6 + axis] = this.pushSteps > 0 ? PUSH_FORCE[axis] : 0;
      this.mj.mj_step(this.model, d);
      if (this.pushSteps > 0) this.pushSteps--;
    }
    if (!this.pushSteps) d.xfrc_applied.fill(0, this.rootId * 6, this.rootId * 6 + 3);
    // mj_step leaves position-dependent buffers at the pre-integration state.
    this.mj.mj_forward(this.model, d);
    this.frame++;
    const ended = this.frame >= this.spec.frames - 1;
    const failed = !d.qpos.every(Number.isFinite) || this.terminated();
    if (ended || failed) { this.resets++; this.reset(); }
    return { ended, failed };
  }
  terminated() {
    const p = this.field("trackedPosition"), q = this.field("trackedQuaternion");
    const anchor = this.config.trackedBodyNames.indexOf(this.config.anchorBody);
    if (Math.abs(this.data.xpos[this.anchorId * 3 + 2] - p[anchor * 3 + 2]) > this.config.anchorZThreshold) return true;
    // UniLab bad_anchor_ori compares gravity projections, not full heading.
    const actual = this.data.xquat.slice(this.anchorId * 4, this.anchorId * 4 + 4);
    const expected = q.subarray(anchor * 4, anchor * 4 + 4);
    const g1 = rotate(conjugate(actual), [0, 0, -1]);
    const g2 = rotate(conjugate(expected), [0, 0, -1]);
    if (Math.abs(g1[2] - g2[2]) > this.config.anchorOrientationThreshold) return true;
    for (const name of ["left_ankle_roll_link", "right_ankle_roll_link", "left_wrist_yaw_link", "right_wrist_yaw_link"]) {
      const idx = this.config.trackedBodyNames.indexOf(name);
      if (Math.abs(this.data.xpos[this.trackedIds[idx] * 3 + 2] - p[idx * 3 + 2]) > this.config.endEffectorZThreshold) return true;
    }
    return false;
  }
}
