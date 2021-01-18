import { AuthPage } from './auth.po';
import { browser, ExpectedConditions, logging } from 'protractor';

function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) ) + min;
}

describe('Register tests', () => {
  let page: AuthPage;

  beforeEach(() => {
    page = new AuthPage();
  });

  it('show errors when existing email is used', async () => {
    const username = 'test2@email.com';
    const password = 'Test123#';

    await page.navigateTo();

    await page.emailField.sendKeys(username);
    await page.passwordField.sendKeys(password);
    await page.registerButton.click();

    await browser.wait(ExpectedConditions.presenceOf(page.toast), 1500);
    await expect(page.toast.isDisplayed()).toBe(true);
  });

  it('does not allow to send form with missing data', async () => {
    const username = 'test@email.com';

    await page.navigateTo();

    await page.emailField.sendKeys(username);
    expect(await page.registerButton.isEnabled()).toBe(false);
  });

  // W idealnej sytuacji istniałby skrypt, który czyści testową bazę danych po każdej
  // suicie testów. Nie ma tak, więc tworzę unikalnego usera za każdym testem.
  //
  // Dodatkowo, test powinien przechodzić, jednakże firebase stwierdza że adres email wpisany automatycznie
  // nie nadaje się do rejestracji, pomimo użycia "trim"
  it('registers user', async () => {
    const username = `test${getRndInteger(1, 1555)}@email.test`.trim();
    const password = 'Test123#';

    console.log(username);

    await page.emailField.sendKeys(username);
    await page.passwordField.sendKeys(password);
    await page.registerButton.click();

    await browser.wait(ExpectedConditions.not(ExpectedConditions.urlContains('auth')), 2500);
  });
});
