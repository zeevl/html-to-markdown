import htmlToMd, {addFormatter} from "../src";

describe('converter', () => {
  it('converts bold marks', () => {
    const result = htmlToMd('this is some <b>bold</b> text')
    expect(result).toBe('this is some **bold** text')
  });

  it('converts a with some attributes', () => {
    const result = htmlToMd('some <a href="https://google.com/" rel="noopener noreferrer" target="_blank">link</a>')
    expect(result).toBe('some [link](https://google.com/)')
  });

  it('converts anchors', () => {
    const result = htmlToMd('this is <a href="https://google.com/">google</a>')
    expect(result).toBe('this is [google](https://google.com/)')
  })

  it('converts brs', () => {
    const result = htmlToMd('line one.<br />line 2.');
    expect(result).toBe('line one.\nline 2.')
  })

  it('example of custom formatter', () => {
    const imgRegex = new RegExp(/<img[^>]* src=\"([^\"]*)\"[^>]*>/, `gim`)

    const replaceImg =  (doc) => {
      return doc.replace(imgRegex, 'img');
    }

    addFormatter('replaceImg', replaceImg)
    const result = htmlToMd('text <img src="some" alt="test"> other');
    expect(result).toBe('text img other')
  })

})
