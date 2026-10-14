// One WebGL canvas + physics world shared by all cards, loaded only on demand.
(() => {
  "use strict";
  let viewer, activeId, translate, statusKey = "loadingEngine", serial = Promise.resolve(), request = 0;
  let userPaused = false, intersects = true, cameraFollow = true, assetModule;
  const assets = () => assetModule ||= import("./simulation/assets.mjs").catch(error => { assetModule = null; throw error; });
  let viewerModule;
  const viewerCode = () => viewerModule ||= import("./simulation/viewer.mjs?v=20261014").catch(error => { viewerModule = null; throw error; });
  const warmShared = () => {
    if (navigator.connection?.saveData) return;
    assets().then(module => module.warmShared()).catch(() => {});
    viewerCode().catch(() => {});
  };
  const el = (tag, className) => { const item = document.createElement(tag); item.className = className; return item; };
  const parking = el("div", "sim-parking");
  parking.hidden = true;
  const stage = el("div", "sim-stage");
  const viewport = el("div", "sim-viewport");
  const status = el("p", "sim-status");
  status.setAttribute("role", "status");
  const toolbar = el("div", "sim-toolbar");
  const clock = el("span", "sim-clock");
  const hint = el("p", "sim-hint");
  const buttons = {};
  for (const key of ["pauseSim", "resetSim", "pushSim", "cameraSim"]) {
    const button = el("button", "sim-control");
    button.type = "button";
    buttons[key] = button;
    toolbar.append(button);
  }
  toolbar.append(clock);
  stage.append(viewport, status, toolbar, hint);
  parking.append(stage);
  document.body.append(parking);
  const updateLabels = () => {
    status.textContent = translate(statusKey);
    for (const [key, button] of Object.entries(buttons)) button.textContent = translate(key === "cameraSim" ? (cameraFollow ? "cameraFollow" : "cameraFree") : key === "pauseSim" && userPaused ? "resumeSim" : key);
    buttons.pauseSim.setAttribute("aria-pressed", String(userPaused));
    buttons.cameraSim.setAttribute("aria-pressed", String(cameraFollow));
    buttons.cameraSim.title = translate(cameraFollow ? "cameraFreeHint" : "cameraFollowHint");
    hint.textContent = translate("simHint");
  };
  const setStatus = (key, values) => {
    if (key === "running") {
      clock.textContent = `${values.time} / ${values.duration} s`;
      clock.dataset.resets = String(values.resets);
      return;
    }
    statusKey = key;
    if (translate) status.textContent = translate(key);
  };
  const visibility = () => viewer?.setVisible(intersects && !parking.contains(stage) && !document.hidden);
  if ("IntersectionObserver" in window) new IntersectionObserver(entries => {
    intersects = entries[0].isIntersecting;
    visibility();
  }, { rootMargin: "100px" }).observe(stage);
  document.addEventListener("visibilitychange", visibility);
  const fail = error => {
    console.error("FlashMimic simulation:", error);
    statusKey = "simError";
    stage.classList.add("has-error");
    stage.classList.remove("is-loading");
    status.textContent = translate("simError");
    buttons.pauseSim.disabled = true;
    buttons.pushSim.disabled = true;
    buttons.cameraSim.disabled = true;
    buttons.resetSim.disabled = false;
    buttons.resetSim.textContent = translate("retrySim");
  };
  async function launch(demo, preview) {
    const started = performance.now();
    assets().then(module => module.warmDemo(demo.id)).catch(() => {});
    const token = ++request;
    activeId = demo.id;
    userPaused = false;
    document.querySelectorAll(".demo-card.is-active").forEach(card => card.classList.remove("is-active"));
    preview.closest(".demo-card").classList.add("is-active");
    preview.append(stage);
    stage.classList.remove("has-error", "is-ready");
    stage.classList.add("is-loading");
    Object.values(buttons).forEach(button => { button.disabled = true; });
    clock.textContent = "";
    statusKey = "loadingEngine";
    updateLabels();
    serial = serial.catch(() => {}).then(async () => {
      if (token !== request) return;
      try {
        if (!viewer) {
          const { createViewer } = await viewerCode();
          viewer = await createViewer(viewport, setStatus, fail);
          viewer.setCameraFollow(cameraFollow);
        }
        if (token !== request) return;
        await viewer.select(demo.id);
        if (token !== request) return;
        stage.classList.remove("is-loading");
        stage.classList.add("is-ready");
        Object.values(buttons).forEach(button => { button.disabled = false; });
        statusKey = "simLive";
        updateLabels();
        visibility();
        console.info("FlashMimic click to ready", JSON.stringify({ id: demo.id, totalMs: Math.round(performance.now() - started) }));
      } catch (error) { if (token === request) fail(error); }
    });
    await serial;
  }
  buttons.pauseSim.addEventListener("click", () => {
    userPaused = !userPaused;
    viewer?.setPaused(userPaused);
    buttons.pushSim.disabled = userPaused;
    statusKey = userPaused ? "simPaused" : "simLive";
    updateLabels();
  });
  buttons.resetSim.addEventListener("click", () => {
    if (stage.classList.contains("has-error")) {
      const preview = stage.parentElement;
      launch({ id: activeId }, preview);
    } else viewer?.reset();
  });
  buttons.pushSim.addEventListener("click", () => viewer?.push());
  buttons.cameraSim.addEventListener("click", () => {
    cameraFollow = !cameraFollow;
    viewer?.setCameraFollow(cameraFollow);
    updateLabels();
  });
  // Warm once as visitors approach the gallery, rather than on every page visit.
  if ("IntersectionObserver" in window) {
    const warmer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      warmer.disconnect();
      warmShared();
    }, { rootMargin: "600px" });
    warmer.observe(document.querySelector("#demos"));
  }
  window.FlashMimicPlayer = {
    park() { parking.append(stage); viewer?.setVisible(false); },
    preview(demo, t) {
      translate = t;
      const preview = el("div", "demo-preview demo-interactive");
      if (demo.poster) {
        const img = document.createElement("img");
        img.src = demo.poster;
        img.alt = typeof demo.title === "string" ? demo.title : demo.title[document.documentElement.lang === "zh-CN" ? "zh" : "en"];
        img.loading = "lazy";
        img.decoding = "async";
        img.addEventListener("error", () => img.remove(), { once: true });
        preview.append(img);
      }
      const launchButton = el("button", "demo-launch");
      launchButton.type = "button";
      const symbol = el("span", "launch-symbol"); symbol.textContent = "▷"; symbol.setAttribute("aria-hidden", "true");
      const label = el("span", "launch-label"); label.textContent = t("launchSim");
      launchButton.append(symbol, label);
      const warm = () => {
        warmShared();
        if (!navigator.connection?.saveData) assets().then(module => module.warmDemo(demo.id)).catch(() => {});
      };
      launchButton.addEventListener("pointerenter", warm, { once: true });
      launchButton.addEventListener("focus", warm, { once: true });
      launchButton.addEventListener("click", () => launch(demo, preview));
      preview.append(launchButton);
      if (demo.id === activeId) {
        preview.append(stage);
        // Card is inserted by app.js immediately after this function returns.
        requestAnimationFrame(() => {
          preview.closest(".demo-card")?.classList.add("is-active");
          updateLabels();
          if (stage.classList.contains("has-error")) buttons.resetSim.textContent = t("retrySim");
          visibility();
        });
      }
      return preview;
    }
  };
})();
