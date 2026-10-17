(() => {
  "use strict";
  const content = window.FLASHMIMIC_CONTENT;
  if (!content) return;
  let language = content.defaultLanguage === "zh" ? "zh" : "en";
  let filter = "all";
  let selectedCurve = content.curves?.[0]?.id;
  try {
    const saved = localStorage.getItem("flashmimic-language");
    if (saved === "en" || saved === "zh") language = saved;
  } catch { /* The page also works without browser storage. */ }
  const $ = (selector) => document.querySelector(selector);
  const localize = (value) => typeof value === "object" && value !== null ? value[language] || value.en || value.zh || "" : String(value ?? "");
  const t = (key) => localize(content.ui[key] || key);
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = localize(text);
    return element;
  };
  // Only web links and relative asset paths are accepted in editable configuration.
  const safeUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return "";
    const url = value.trim();
    if (/^(https?:\/\/)/i.test(url)) return url;
    return /^(\/\/|[a-z][a-z\d+.-]*:)/i.test(url) ? "" : url;
  };
  const link = (url, text, className) => {
    const element = node("a", className, text);
    element.href = safeUrl(url);
    if (!url.startsWith("#")) {
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
    return element;
  };
  const media = ({ src, poster, type, alt, width, height }, eager = false) => {
    const element = node(type === "video" ? "video" : "img");
    if (type === "video") {
      element.controls = true;
      element.playsInline = true;
      element.preload = eager ? "metadata" : "none";
      element.addEventListener("play", () => {
        document.querySelectorAll("video").forEach(other => { if (other !== element) other.pause(); });
      });
      if (safeUrl(poster)) element.poster = safeUrl(poster);
      element.setAttribute("aria-label", localize(alt));
    } else {
      element.alt = localize(alt);
      element.loading = eager ? "eager" : "lazy";
      element.decoding = "async";
    }
    if (width > 0 && height > 0) { element.width = width; element.height = height; }
    element.addEventListener("error", () => element.replaceWith(node("p", "media-error", t("mediaError"))), { once: true });
    element.src = safeUrl(src);
    return element;
  };
  function renderResources() {
    document.querySelectorAll("[data-resource]").forEach((old) => {
      const key = old.dataset.resource;
      const url = safeUrl(content.links[key]);
      if (key === "github") {
        if (url) { old.href = url; old.hidden = false; }
        else old.hidden = true;
        return;
      }
      const resource = url ? link(url, "", "button") : node("span", "button pending");
      resource.dataset.resource = key;
      resource.append(node("span", "", key === "paper" ? "▤" : "▧"), node("span", "", t(key)));
      resource.firstChild.setAttribute("aria-hidden", "true");
      if (!url) { resource.setAttribute("aria-disabled", "true"); resource.append(node("span", "soon", t("soon"))); }
      old.replaceWith(resource);
    });
  }
  // Unconfigured media keeps its original styled placeholder; no missing-file requests.
  function renderHeroMedia() {
    const { video, poster, alt, width, height } = content.hero;
    if (!safeUrl(video) && !safeUrl(poster)) return;
    const slot = $("#teaser-slot");
    slot.classList.add("is-loaded");
    slot.replaceChildren(media({ src: video || poster, poster, type: video ? "video" : "image", alt, width, height }, true));
    if (localize(content.hero.caption) || safeUrl(content.hero.pdf)) {
      const caption = node("figcaption", "", content.hero.caption);
      if (safeUrl(content.hero.pdf)) caption.append(link(content.hero.pdf, t("viewOriginalPdf"), "text-link"));
      slot.append(caption);
    }
  }
  function renderMethodMedia() {
    if (!safeUrl(content.method.image)) return;
    const slot = $("#method-slot");
    slot.classList.add("is-loaded");
    const caption = node("figcaption", "", content.method.caption || content.method.alt);
    caption.append(link(content.method.pdf || content.method.image, t(content.method.pdf ? "viewOriginalPdf" : "methodDownload"), "text-link"));
    slot.replaceChildren(media({ src: content.method.image, type: "image", alt: content.method.alt, width: content.method.width, height: content.method.height }), caption);
  }
  function selectCurve(id, moveFocus = false) {
    const curve = content.curves.find(item => item.id === id);
    if (!curve) return;
    selectedCurve = id;
    document.querySelectorAll("[data-curve]").forEach(button => {
      const active = button.dataset.curve === id;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && moveFocus) button.focus();
    });
    const image = media({ src: curve.image, type: "image", alt: t("curveAlt").replace("{action}", localize(curve.title)) }, true);
    image.width = 1368; image.height = 280;
    $("#curve-image").replaceChildren(image);
    $("#curve-image").scrollLeft = 0;
    $("#curve-panel").setAttribute("aria-labelledby", `curve-tab-${id}`);
    $("#curve-note").textContent = localize(curve.note);
  }
  function renderResearch() {
    const curves = content.curves || [];
    const tabs = $("#curve-tabs");
    const legend = document.querySelector(".curve-legend");
    if (curves.length) {
      tabs.hidden = false;
      if (legend) legend.hidden = false;
      tabs.replaceChildren(...curves.map((curve, index) => {
        const button = node("button", "", curve.title);
        button.type = "button"; button.role = "tab";
        button.id = `curve-tab-${curve.id}`; button.dataset.curve = curve.id;
        button.setAttribute("aria-controls", "curve-panel");
        button.addEventListener("click", () => selectCurve(curve.id));
        button.addEventListener("keydown", event => {
          const count = curves.length;
          const next = event.key === "ArrowRight" ? (index + 1) % count : event.key === "ArrowLeft" ? (index - 1 + count) % count : event.key === "Home" ? 0 : event.key === "End" ? count - 1 : -1;
          if (next >= 0) { event.preventDefault(); selectCurve(curves[next].id, true); }
        });
        return button;
      }));
      selectCurve(selectedCurve);
    } else if (content.timeTarget) {
      // Single overview figure (paper Fig. 3); it carries its own legend.
      tabs.hidden = true;
      if (legend) legend.hidden = true;
      const figure = content.timeTarget;
      const image = media({ src: figure.image, type: "image", alt: figure.alt }, true);
      if (figure.width > 0 && figure.height > 0) { image.width = figure.width; image.height = figure.height; }
      $("#curve-image").replaceChildren(image);
      $("#curve-image").scrollLeft = 0;
      $("#curve-note").textContent = localize(figure.note);
    }
    $("#comparison-head").replaceChildren(...content.comparisonColumns.map(title => {
      const heading = node("th", "", title); heading.scope = "col"; return heading;
    }));
    $("#evaluation-notes").replaceChildren(...content.evaluationNotes.map(note => {
      const item = node("article"); item.append(node("h4", "", note.title), node("p", "", note.text)); return item;
    }));
    $("#materials-list").replaceChildren(...content.materials.map((material, index) => {
      const item = node("article", "material-card");
      item.append(node("span", "material-number", String(index + 1).padStart(2, "0")), node("h3", "", material.title), node("p", "", material.description));
      const links = node("div", "figure-links");
      material.links.forEach(resource => {
        const anchor = link(resource.url, resource.label);
        anchor.setAttribute("download", ""); links.append(anchor);
      });
      item.append(links); return item;
    }));
  }
  function renderGallery() {
    window.FlashMimicPlayer?.park();
    document.querySelectorAll("#demo-list video").forEach(video => video.pause());
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.hidden = button.dataset.filter !== "all" && !content.demos.some(demo => demo.type === button.dataset.filter);
    });
    const visible = content.demos.filter((demo) => filter === "all" || demo.type === filter);
    const group = demo => demo.category === "real" ? "realWorldTitle" : demo.type === "interactive" ? "simulationTitle" : "mediaTitle";
    $("#demo-list").replaceChildren(...visible.flatMap((demo, index) => {
      const card = node("article", `demo-card${demo.category === "real" ? " demo-card--real" : ""}`);
      const preview = demo.type === "interactive" ? window.FlashMimicPlayer.preview(demo, t) : node("div", "demo-preview");
      const src = safeUrl(demo.src);
      const poster = safeUrl(demo.poster);
      if (demo.type === "interactive") { /* Shared live player owns this preview. */ }
      else if (src || poster) preview.append(media({ src: src || poster, poster, type: src ? demo.type : "image", alt: demo.title }));
      else {
        const icon = node("span", "", demo.type === "video" ? "▷" : "◇");
        icon.setAttribute("aria-hidden", "true");
        preview.append(icon, node("small", "", t("demoPending")));
      }
      const info = node("div", "demo-info");
      info.append(node("p", "demo-type", t(demo.category === "real" ? "realVideoType" : demo.type === "interactive" ? "interactiveType" : demo.type === "video" ? "videoType" : "imageType")), node("h4", "", demo.title), node("p", "", demo.description));
      if (safeUrl(demo.recording)) info.append(link(demo.recording, t("watchRecording")));
      if (safeUrl(demo.url)) info.append(link(demo.url, t("openDemo")));
      card.append(preview, info);
      return !index || group(demo) !== group(visible[index - 1])
        ? [node("h3", "demo-group-title", t(group(demo))), card] : [card];
    }));
    if (!visible.length) $("#demo-list").append(node("p", "gallery-empty", t("noDemos")));
    $("#gallery-count").textContent = t("galleryCount").replace("{count}", visible.length);
  }
  function render() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = language === "zh" ? "FlashMimic — 项目主页" : "FlashMimic — Project Page";
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll("[data-i18n-alt]").forEach(element => { element.alt = t(element.dataset.i18nAlt); });
    document.querySelectorAll("[data-i18n-aria]").forEach(element => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
    document.querySelectorAll("[data-language]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
    $("#project-subtitle").textContent = localize(content.hero.subtitle);
    $("#project-description").textContent = localize(content.hero.description);
    $("#stats").replaceChildren(...content.stats.map((stat) => {
      const item = node("div", "stat"); item.append(node("strong", "", stat.value), node("p", "", stat.label), node("small", "", stat.note)); return item;
    }));
    $("#highlight-list").replaceChildren(...content.highlights.map((highlight, index) => {
      const item = node("article", "highlight"); item.append(node("span", "highlight-number", String(index + 1).padStart(2, "0")), node("h3", "", highlight.title), node("p", "", highlight.text)); return item;
    }));
    $("#comparison-body").replaceChildren(...content.comparison.map((row) => {
      const tr = node("tr", row.ours ? "ours" : "");
      const heading = node("th", "", row.name); heading.scope = "row"; tr.append(heading);
      tr.append(...Array.from({ length: content.comparisonColumns.length - 1 }, (_, index) => node("td", "", row.values[index] ?? "—"))); return tr;
    }));
    $("#news-list").replaceChildren(...[...content.news].sort((a, b) => b.date.localeCompare(a.date)).map((news) => {
      const item = node("li"); const date = node("time", "", news.date); date.dateTime = news.date; item.append(date, node("span", "", news.text)); return item;
    }));
    const authors = $("#author-list");
    authors.replaceChildren();
    if (!content.authors.length) authors.textContent = t("authorsPending");
    content.authors.forEach((author, index) => {
      if (index) authors.append(document.createTextNode(" · "));
      const name = localize(author.name) + (author.affiliation ? ` (${localize(author.affiliation)})` : "");
      authors.append(safeUrl(author.url) ? link(author.url, name) : node("span", "", name));
    });
    const affiliations = $("#affiliation-list");
    affiliations.replaceChildren();
    if (!content.affiliations.length) {
      for (let i = 0; i < 3; i++) {
        const item = node("div", "affiliation-placeholder"); const icon = node("span", "", "◇"); icon.setAttribute("aria-hidden", "true"); item.append(icon, node("div", "", t("affiliationPending"))); affiliations.append(item);
      }
    } else content.affiliations.forEach((affiliation) => {
      const item = safeUrl(affiliation.url) ? link(affiliation.url, "") : node("div");
      if (safeUrl(affiliation.logo)) { const logo = media({ src: affiliation.logo, type: "image", alt: affiliation.name }); logo.className = "affiliation-logo"; item.append(logo); }
      else item.append(node("span", "affiliation-placeholder", affiliation.name));
      affiliations.append(item);
    });
    $("#citation-code").textContent = content.citation || t("citationPlaceholder");
    $("#copy-citation").disabled = !content.citation.trim();
    $("#copy-citation").textContent = t(content.citation.trim() ? "copy" : "citationPending");
    $("#copy-status").textContent = "";
    $(".menu-toggle").setAttribute("aria-label", t($(".menu-toggle").getAttribute("aria-expanded") === "true" ? "menuClose" : "menuOpen"));
    renderResources(); renderHeroMedia(); renderMethodMedia(); renderResearch(); renderGallery();
  }
  const menu = $(".menu-toggle");
  function closeMenu() {
    menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", t("menuOpen")); $("#nav-links").classList.remove("is-open");
  }
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", t(open ? "menuClose" : "menuOpen")); $("#nav-links").classList.toggle("is-open", open);
  });
  document.querySelectorAll("#nav-links a").forEach((anchor) => anchor.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
  document.addEventListener("click", (event) => { if (!$(".site-header").contains(event.target)) closeMenu(); });
  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => {
    language = button.dataset.language; try { localStorage.setItem("flashmimic-language", language); } catch { /* Optional persistence. */ } render();
  }));
  document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.filter === filter)));
    renderGallery();
  }));
  $("#copy-citation").addEventListener("click", async () => {
    if (!content.citation.trim()) return;
    try {
      await navigator.clipboard.writeText(content.citation);
      $("#copy-citation").textContent = t("copied"); $("#copy-status").textContent = t("copied");
    } catch {
      const range = document.createRange(); range.selectNodeContents($("#citation-code"));
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      $("#copy-citation").textContent = t("copyFailed"); $("#copy-status").textContent = t("copyFailed");
    }
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll("#nav-links a").forEach((anchor) => {
          const active = anchor.hash === `#${entry.target.id}`;
          anchor.classList.toggle("active", active);
          if (active) anchor.setAttribute("aria-current", "location"); else anchor.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
  }
  render();
})();
