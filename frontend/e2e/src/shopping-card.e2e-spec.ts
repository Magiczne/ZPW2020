import { AuthPage } from './auth.po';
import { browser } from 'protractor';
import { TripsPage } from './trips.po';

describe('Shopping card related', () => {
  const authPage = new AuthPage();
  let page: TripsPage

  beforeAll(async () => {
    await authPage.navigateTo();
    await authPage.emailField.sendKeys('test2@email.com');
    await authPage.passwordField.sendKeys('Test123#');
    await authPage.submitButton.click();

    browser.sleep(1000);
  });

  afterAll(async () => {
    await authPage.logoutButton.click();
  });

  beforeEach(() => {
    page = new TripsPage();
  });

  it('handles shopping card', async () => {
    await page.navigateTo();

    await page.firstReserveBtn.click();
    expect(await page.shoppingCardCounter.getText()).toBe('1');

    await page.firstReserveBtn.click();
    expect(await page.shoppingCardCounter.getText()).toBe('2');

    await page.firstUndoReserveBtn.click();
    expect(await page.shoppingCardCounter.getText()).toBe('1');

    await page.firstUndoReserveBtn.click();
    expect(await page.shoppingCardCounter.getText()).toBe('');
  });
});
