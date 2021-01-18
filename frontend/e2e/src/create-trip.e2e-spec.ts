import { AuthPage } from './auth.po';
import {browser, by, element, ExpectedConditions} from 'protractor';
import { CreateTripPage } from './create-trip.po';
import {Trip} from '../../src/app/models/trip';

function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) ) + min;
}

describe('Create trip tests', () => {
  const authPage = new AuthPage();
  let page: CreateTripPage;
  let trip: Trip;

  beforeAll(async () => {
    await authPage.navigateTo();
    await authPage.emailField.sendKeys('test2@email.com');
    await authPage.passwordField.sendKeys('Test123#');
    await authPage.submitButton.click();

    trip = new Trip();
    trip.name = `Trip name ${getRndInteger(1, 1500)}`;
    trip.destination = 'Destination';
    trip.startDate = new Date(2021, 1, 1);
    trip.endDate = new Date(2021, 1, 5);
    trip.maxPeopleCount = 5;
    trip.price = 120;
    trip.description = 'Description';
    trip.photoUrl = 'https://via.placeholder.com/500x500';

    browser.sleep(1000);
  });

  afterAll(async () => {
    await authPage.logoutButton.click();
  });

  beforeEach(() => {
    page = new CreateTripPage();
  });

  it('will not allow to send when any field is not filled', async () => {
    browser.wait(ExpectedConditions.visibilityOf(element(by.cssContainingText('.nav-link', 'Dashboard'))), 3000);
    await element(by.cssContainingText('.nav-link', 'Dashboard')).click();

    await browser.waitForAngular('Waiting');
    await element(by.cssContainingText('.nav-link', 'Create a trip')).click();

    await page.nameField.sendKeys('Some name');
    expect(await page.saveBtn.isEnabled()).toBe(false);
  });

  it('stores trip', async () => {
    await page.navigateTo();

    await page.nameField.sendKeys(trip.name);
    await page.destinationField.sendKeys(trip.destination);
    await page.startDateField.sendKeys('01.01.2021');
    await page.endDateField.sendKeys('05.01.2021');
    await page.maxPeopleField.sendKeys(trip.maxPeopleCount);
    await page.priceField.sendKeys(trip.price);
    await page.descriptionField.sendKeys(trip.description);
    await page.photoField.sendKeys(trip.photoUrl);

    await page.saveBtn.click();
  });

  it('stores trip with existing data', async () => {
    await page.navigateTo();

    await page.nameField.sendKeys(trip.name);
    await page.destinationField.sendKeys(trip.destination);
    await page.startDateField.sendKeys('01.01.2021');
    await page.endDateField.sendKeys('05.01.2021');
    await page.maxPeopleField.sendKeys(trip.maxPeopleCount);
    await page.priceField.sendKeys(trip.price);
    await page.descriptionField.sendKeys(trip.description);
    await page.photoField.sendKeys(trip.photoUrl);

    await page.saveBtn.click();
  });
});
