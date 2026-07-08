export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const html = await response.text();

  const ogTags = `
  <!-- SID Meta / Open Graph preview tags for Facebook, WhatsApp and LinkedIn -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SID.DEV.BR">
  <meta property="og:title" content="Sidinei Schaedler | QA Júnior em Formação">
  <meta property="og:description" content="Portfólio profissional de Sidinei Schaedler, estudante de ADS na Feevale com foco em QA, testes de software, automação, APIs, suporte técnico e cibersegurança defensiva.">
  <meta property="og:url" content="https://siddevbr-mirror.netlify.app/">
  <meta property="og:image" content="https://siddevbr-mirror.netlify.app/assets/images/galeria-curada/sid_visual.JPG">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:alt" content="Retrato visual autoral de Sidinei Schaedler para portfólio profissional de QA e tecnologia.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Sidinei Schaedler | QA Júnior em Formação">
  <meta name="twitter:description" content="Portfólio profissional com foco em QA, testes de software, automação, APIs e cibersegurança defensiva.">
  <meta name="twitter:image" content="https://siddevbr-mirror.netlify.app/assets/images/galeria-curada/sid_visual.JPG">
  `;

  const cleanedHtml = html.replace(/<meta\s+(?:property|name)=["'](?:og:|twitter:)[^>]*>\s*/gi, "");
  const updatedHtml = cleanedHtml.includes("</head>")
    ? cleanedHtml.replace("</head>", `${ogTags}\n</head>`)
    : `${ogTags}\n${cleanedHtml}`;

  const headers = new Headers(response.headers);
  headers.set("content-type", contentType);

  return new Response(updatedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
