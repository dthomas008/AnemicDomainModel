import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHomeText() {
    return element(by.linkText('Home')).getText();
  }
}
