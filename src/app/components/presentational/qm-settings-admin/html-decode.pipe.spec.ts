import { HtmlDecodePipe } from './html-decode.pipe';

describe('HtmlDecodePipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlDecodePipe();
    expect(pipe).toBeTruthy();
  });
});
