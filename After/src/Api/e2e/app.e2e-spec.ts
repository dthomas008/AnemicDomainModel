import { AppPage } from './app.po';

describe('movies App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHomeText()).toEqual('Home');
  });
});
