(() => {
  const headerTitle = document.querySelector(".md-header__title");
  const headerInner = document.querySelector(".md-header__inner");
  const logo = document.querySelector(".md-header__button.md-logo");

  if (!headerTitle) {
    return;
  }

  const guideHomeUrl = new URL(logo?.getAttribute("href") || ".", document.baseURI).href;

  if (headerInner && logo && !document.querySelector(".md-header-portal-home")) {
    const portalHome = document.createElement("a");
    portalHome.className = "md-header-portal-home";
    portalHome.href = "https://tonkex.github.io/";
    portalHome.setAttribute("aria-label", "tonkex.github.io 홈으로 이동");
    portalHome.innerHTML = `
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
      <span>Home</span>
    `;
    headerInner.insertBefore(portalHome, logo);
  }

  headerTitle.setAttribute("role", "link");
  headerTitle.setAttribute("tabindex", "0");
  headerTitle.setAttribute("title", "가이드북 첫 페이지로 이동");

  headerTitle.addEventListener("click", () => {
    window.location.href = guideHomeUrl;
  });

  headerTitle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = guideHomeUrl;
    }
  });
})();
