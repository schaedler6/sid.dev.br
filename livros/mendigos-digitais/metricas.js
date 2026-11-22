(() => {
  const configured = document.currentScript?.dataset.endpoint;
  if (!configured) return;

  let endpoint;
  try {
    endpoint = new URL(configured, location.origin);
  } catch {
    return;
  }
  const loopback = endpoint.hostname === "127.0.0.1" && location.hostname === "127.0.0.1";
  const owned = endpoint.protocol === "https:"
    && (endpoint.hostname === "sid.dev.br" || endpoint.hostname.endsWith(".sid.dev.br"));
  if (!loopback && !owned) return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === "1") return;

  const path = "/livros/mendigos-digitais/";
  const purchase = "https://clubedeautores.com.br/livro/mendigos-digitais";
  const record = (event) => {
    const body = JSON.stringify({ event, path });
    fetch(endpoint, {
      method: "POST",
      body,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      keepalive: true,
      credentials: "omit",
      referrerPolicy: "no-referrer",
    }).catch(() => {});
  };

  record("page_view");
  document.addEventListener("click", (event) => {
    if (event.target.closest?.("a[href]")?.href === purchase) record("purchase_click");
  });
})();
