import { browser, by, element, ElementFinder } from 'protractor';

export class AuthPage {
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/auth`) as Promise<unknown>;
  }

  get emailField(): ElementFinder {
    return element(by.css('[name=email]'));
  }

  get passwordField(): ElementFinder {
    return element(by.css('[name=password]'));
  }

  get submitButton(): ElementFinder {
    return element(by.buttonText('Login'));
  }

  get registerButton(): ElementFinder {
    return element(by.buttonText('Register'));
  }

  get logoutButton(): ElementFinder {
    return element(by.id('btn-logout'));
  }

  get toast(): ElementFinder {
    return element(by.css('.ngx-toastr'));
  }
}
