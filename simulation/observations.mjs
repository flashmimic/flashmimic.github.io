// FlashMimic G1 actor layout. Quaternions use MuJoCo's [w, x, y, z].
// Keep this in sync with FlashMimic's obs_terms.py, not generic G1 tracking demos.
export const conjugate = ([w, x, y, z]) => [w, -x, -y, -z];
export function multiply(a, b) {
  const [w, x, y, z] = a, [v, i, j, k] = b;
  return [w*v-x*i-y*j-z*k, w*i+x*v+y*k-z*j, w*j-x*k+y*v+z*i, w*k+x*j-y*i+z*v];
}
export function rotate(q, v) {
  const [w, x, y, z] = q, [a, b, c] = v;
  const tx = 2*(y*c-z*b), ty = 2*(z*a-x*c), tz = 2*(x*b-y*a);
  return [a+w*tx+y*tz-z*ty, b+w*ty+z*tx-x*tz, c+w*tz+x*ty-y*tx];
}
export function projectedYaw(q) {
  const x = rotate(q, [1, 0, 0]);
  let heading = x;
  if (Math.hypot(x[0], x[1]) <= 0.1) {
    const z = rotate(q, [0, 0, 1]);
    heading = x[2] < 0 ? z : z.map(v => -v);
  }
  const half = Math.atan2(heading[1], heading[0]) / 2;
  return [Math.cos(half), 0, 0, Math.sin(half)];
}
export function rot6Rows([w, x, y, z]) {
  return [1-2*(y*y+z*z), 2*(x*y-w*z), 2*(x*z+w*y),
          2*(x*y+w*z), 1-2*(x*x+z*z), 2*(y*z-w*x)];
}
export function motionField(motion, spec, frame, name) {
  frame = Math.max(0, Math.min(spec.frames - 1, frame));
  const { offset, width } = spec.layout[name];
  const start = frame * spec.stride + offset;
  return motion.subarray(start, start + width);
}
export function buildObservation(state, motion, spec, config, frame, lastAction) {
  const result = new Float32Array(config.observationDim);
  let cursor = 0;
  const put = values => { result.set(values, cursor); cursor += values.length; };
  put(lastAction);
  const invYaw = conjugate(projectedYaw(state.rootQuaternion));
  for (const step of config.futureSteps) {
    const p = motionField(motion, spec, frame + step, "rootPosition");
    put(rotate(invYaw, p.map((v, i) => v - state.rootPosition[i])));
  }
  const invRoot = conjugate(state.rootQuaternion);
  for (const step of config.futureSteps) {
    put(rot6Rows(multiply(invRoot, motionField(motion, spec, frame + step, "rootQuaternion"))));
  }
  for (const step of config.futureSteps) put(motionField(motion, spec, frame + step, "jointPosition"));
  put(state.gyro);
  // Training reads the negative framezaxis sensor in world coordinates.
  put(state.upVector.map(v => -v));
  // FlashMimic uses absolute joint positions minus episode bias (zero here).
  put(state.jointPosition);
  put(state.jointVelocity);
  if (cursor !== result.length || !result.every(Number.isFinite)) throw new Error("Invalid FlashMimic observation layout.");
  return result;
}
