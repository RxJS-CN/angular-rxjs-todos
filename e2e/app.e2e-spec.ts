import { AngularRxjsTodosPage } from './app.po';

describe('angular-rxjs-todos App', () => {
  let page: AngularRxjsTodosPage;

  beforeEach(() => {
    page = new AngularRxjsTodosPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
