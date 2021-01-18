import { AuthPage } from './auth.po';
import { browser, ExpectedConditions, logging } from 'protractor';

describe('Login tests', () => {
  let checkLogs: boolean;
  let page: AuthPage;

  beforeEach(async () => {
    checkLogs = true;
    page = new AuthPage();
  });

  afterEach(async () => {
    if (checkLogs) {
      const logs = await browser.manage().logs().get(logging.Type.BROWSER);

      expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry));
    }
  });

  it('logs in correctly', async () => {
    const username = 'test2@email.com';
    const password = 'Test123#';

    await page.navigateTo();

    await page.emailField.sendKeys(username);
    await page.passwordField.sendKeys(password);
    await page.submitButton.click();
  });

  [
    ['test@email.com', 'Test123'],
    ['test3@email.com', 'Test123#'],
    ['tes@email.com', 'Test123']
  ].forEach(([username, password], idx) => {
    it(`fails to log in with set #${idx}`, async () => {
      checkLogs = false;

      await page.navigateTo();

      await page.emailField.sendKeys(username);
      await page.passwordField.sendKeys(password);
      await page.submitButton.click();

      await browser.wait(ExpectedConditions.presenceOf(page.toast), 1500);
      await expect(page.toast.isDisplayed()).toBe(true);
    });
  });
});
