const puppeteer = require("puppeteer");
const validateBanorte3DSecure = async (object) => {
  //console.log("body:", object.body);
  try {
    const browser = await getDefaultBrowser(false);
    const page = await getDefaultPage(browser);

    const response = await validateCard(page, object.body);

    await browser.close();
    return response;
  } catch (error) {
    console.log("Error: ", error);
    return false;
  }
};

const getDefaultBrowser = async () => {
  const browser = await puppeteer.launch(); // if we need them.);

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
  await page.setDefaultNavigationTimeout(40000);
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
