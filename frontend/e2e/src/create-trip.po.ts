import { browser, by, element, ElementFinder } from 'protractor';

export class CreateTripPage {
  async navigateTo(): Promise<void> {
    await element(by.cssContainingText('.nav-link', 'Dashboard')).click();
    await element(by.cssContainingText('.nav-link', 'Create a trip')).click();

    await browser.get(`${browser.baseUrl}/dashboard/trip/create`);
  }

  get nameField(): ElementFinder {
    return element(by.id('name'));
  }

  get destinationField(): ElementFinder {
    return element(by.id('destination'));
  }

  get startDateField(): ElementFinder {
    return element(by.id('startDate'));
  }

  get endDateField(): ElementFinder {
    return element(by.id('endDate'));
  }

  get maxPeopleField(): ElementFinder {
    return element(by.id('maxPeopleCount'));
  }

  get priceField(): ElementFinder {
    return element(by.id('price'));
  }

  get descriptionField(): ElementFinder {
    return element(by.id('description'));
  }

  get photoField(): ElementFinder {
    return element(by.id('photo'));
  }

  get saveBtn(): ElementFinder {
    return element(by.buttonText('Save'));
  }
}

