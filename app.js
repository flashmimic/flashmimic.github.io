(() => {
  "use strict";
  const content = window.FLASHMIMIC_CONTENT;
  if (!content) return;
  let language = content.defaultLanguage === "zh" ? "zh" : "en";
  let filter = "all";
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
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    return element;
  };
  const media = ({ src, poster, type, alt }, eager = false) => {
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
    const { video, poster, alt } = content.hero;
    if (!safeUrl(video) && !safeUrl(poster)) return;
    const slot = $("#teaser-slot");
    slot.classList.add("is-loaded");
    slot.replaceChildren(media({ src: video || poster, poster, type: video ? "video" : "image", alt }, true));
  }
  function renderMethodMedia() {
    if (!safeUrl(content.method.image)) return;
    const slot = $("#method-slot");
    slot.classList.add("is-loaded");
    slot.replaceChildren(media({ src: content.method.image, type: "image", alt: content.method.alt }), node("figcaption", "", content.method.caption || content.method.alt));
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
    document.querySelectorAll("[data-language]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
    $("#project-subtitle").textContent = localize(content.hero.subtitle);
    $("#project-description").textContent = localize(content.hero.description);
    $("#stats").replaceChildren(...content.stats.map((stat) => {
      const item = node("div", "stat"); item.append(node("strong", "", stat.value), node("p", "", stat.label), node("small", "", stat.note)); return item;
    }));
    $("#highlight-list").replaceChildren(...content.highlights.map((highlight, index) => {
      const item = node("article", "highlight"); item.append(node("span", "highlight-number", String(index + 1).padStart(2, "0")), node("h3", "", highlight.title), node("p", "", highlight.text)); return item;
    }));
    $("#result-list").replaceChildren(...content.results.map((result) => {
      const figure = node("figure", "result-figure media-slot");
      const toolbar = node("div", "figure-toolbar"); toolbar.append(node("span", "", result.title));
      figure.append(toolbar);
      if (safeUrl(result.image)) figure.append(media({ src: result.image, type: "image", alt: result.title }));
      else { const placeholder = node("div", "plot-placeholder"); placeholder.append(node("span", "", t("dataPending"))); figure.append(placeholder); }
      figure.append(node("figcaption", "", result.caption)); return figure;
    }));
    $("#comparison-body").replaceChildren(...content.comparison.map((row) => {
      const tr = node("tr", row.ours ? "ours" : "");
      const heading = node("th", "", row.name); heading.scope = "row"; tr.append(heading);
      tr.append(...Array.from({ length: 3 }, (_, index) => node("td", "", row.values[index] ?? "—"))); return tr;
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
    renderResources(); renderHeroMedia(); renderMethodMedia(); renderGallery();
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
