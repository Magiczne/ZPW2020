import { AuthPage } from './auth.po';
import { $, by, browser, ExpectedConditions, logging,  } from 'protractor';

describe('Login tests', () => {
  let page: AuthPage;

  beforeEach(() => {
    page = new AuthPage();
  });

  it('logs in correctly', async () => {
    const username = 'test@email.com';
    const password = 'Test123#';

    await page.navigateTo();

    await page.emailField.sendKeys(username);
    await page.passwordField.sendKeys(password);
    await page.submitButton.click();
  });

  [
    ['test@email.com', 'Test123'],
    ['test2@email.com', 'Test123#'],
    ['tes@email.com', 'Test123']
  ].forEach(([username, password], idx) => {
    it(`fails to log in with set #${idx}`, async () => {
      await page.navigateTo();

      await page.emailField.sendKeys(username);
      await page.passwordField.sendKeys(password);
      await page.submitButton.click();
    });
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });
});
