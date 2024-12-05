const puppeteer = require("puppeteer");
const validateBanorte3DSecure = async (object) => {
  //console.log("body:", object.body);
  var body = object.body;
  try {
    const browser = await getDefaultBrowser(false);
    const page = await getDefaultPage(browser);
    body = validateBody(body);
    console.log("body: ", body);
    const response = await validateCard(page, body);

    await browser.close();
    return response;
  } catch (error) {
    await browser.close();
    console.log("Error: ", error);
    return false;
  }
};

const validateBody = (body) => {
  const requiredParams = [
    "NUMERO_TARJETA",
    "FECHA_EXP",
    "MONTO",
    "MARCA_TARJETA",
    "ID_AFILIACION",
    "NOMBRE_COMERCIO",
    "CIUDAD_COMERCIO",
    "URL_RESPUESTA",
    "CERTIFICACION_3D",
    "REFERENCIA3D",
    "CIUDAD",
    "PAIS",
    "CORREO",
    "NOMBRE",
    "APELLIDO",
    "CODIGO_POSTAL",
    "ESTADO",
    "CALLE",
    "VERSION_3D",
    "NUMERO_CELULAR",
    "TIPO_TARJETA",
  ];

  // Convert all body keys to uppercase
  const uppercasedBody = {};
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      uppercasedBody[key.toUpperCase()] = body[key];
    }
  }

  for (const param of requiredParams) {
    if (!uppercasedBody.hasOwnProperty(param)) {
      throw new Error(`Missing required parameter: ${param}`);
    }
  }
  return uppercasedBody;
};

const getDefaultBrowser = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  }); // if we need them.);

  const context = browser.defaultBrowserContext();
  return browser;
};

const getDefaultPage = async (browser) => {
  const page = await browser.newPage();
  await page.setViewport({
    width: 800,
    height: 800,
    deviceScaleFactor: 1,
  });
  await page.setDefaultNavigationTimeout(20000);
  return page;
};

const validateCard = async (page, body) => {
  const url = await prepareURL(body);
  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const content = await page.content();
  console.log("content", content);

  if (content.includes('"title":"One or more validation errors occurred."')) {
    console.log("Validation error found in content");
    return false;
  }

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  const redirectedContent = await page.content();
  console.log("redirect", redirectedContent);
  // success <html><head><meta name="color-scheme" content="light dark"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">Data received successfully.</pre></body></html>
  if (redirectedContent.includes("Data received successfully")) {
    return true;
  } else {
    return false;
  }
};

const prepareURL = async (body) => {
  const params = new URLSearchParams(body).toString();
  const url = `https://via.banorte.com/secure3d/Solucion3DSecure.htm?${params}`;
  return url;
};
module.exports = {
  validateBanorte3DSecure,
};
