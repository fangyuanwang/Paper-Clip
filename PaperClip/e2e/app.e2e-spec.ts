import { PaperClipPage } from './app.po';

describe('paper-clip App', () => {
  let page: PaperClipPage;

  beforeEach(() => {
    page = new PaperClipPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
