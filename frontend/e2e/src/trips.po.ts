import { browser, by, element, ElementFinder } from 'protractor';

export class TripsPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  get firstReserveBtn(): ElementFinder {
    return element(by.css('.trip .btn-reserve'));
  }

  get firstUndoReserveBtn(): ElementFinder {
    return element(by.css('.trip .btn-undo-reserve'));
  }

  get shoppingCardCounter(): ElementFinder {
    return element(by.css('[data-pt=shopping-card-counter]'));
  }
}
