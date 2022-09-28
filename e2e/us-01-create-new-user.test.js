const puppeteer = require("puppeteer");
const { setDefaultOptions } = require("expect-puppeteer");
const fs = require("fs");
const fsPromises = fs.promises;

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("US-01 - Create a new user - E2E", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 1000 });
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.on("console", onPageConsole);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseURL}/`, { waitUntil: "load" });
    await page.click("button", { text: "register" });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/ page", () => {
    test("filling and submitting form creates a new user and then displays the dashboard.", async () => {
      await page.type("input[name=first_name]", "James");
      await page.type("input[name=last_name]", "Smith");
      await page.type("input[name=email]", "test@email.com");
      await page.type("input[name=password]", "P@ssword1");

      await page.screenshot({
        path: ".screenshots/us-01-submit-before.png",
        fullPage: true,
      });

      await Promise.all([
        page.click("[type=submit]"),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);

      await page.screenshot({
        path: ".screenshots/us-01-submit-after.png",
        fullPage: true,
      });
    });
  });
});
