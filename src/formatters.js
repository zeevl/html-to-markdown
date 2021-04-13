
const headingRegex = new RegExp(/<h(\d*)>([\s\S]*?)<\/h\d*>/, `gim`);
const pRegex = new RegExp(/<p>([\s\S]*?)<\/p>/, `gim`);
const ulRegex = new RegExp(/<ul>([\s\S]*?)<\/ul>/, `gim`);
const olRegex = new RegExp(/<ol>([\s\S]*?)<\/ol>/, `gim`);
const liRegex = new RegExp(/<li>([\s\S]*?)<\/li>/, `gim`);
const preRegex = new RegExp(/<pre>([\s\S]*?)<\/pre>/, `gim`);
const blockQuoteRegex = new RegExp(/<blockquote>([\s\S]*?)<\/blockquote>/, `gim`);
const boldRegex = new RegExp(/<(?:b|strong)>([\s\S]*?)<\/\w*>/, `gim`);
const italicRegex = new RegExp(/<(?:i|em)>([\s\S]*?)<\/\w*>/, `gim`);
const hrefRegex = new RegExp(/<a href=['|"](.+)['|"]\s*>(.+)<\/a>/, `gim`);
const brRegex = new RegExp(/<br \/>/, `gim`);

/**
 * @descriptions adds number of hashes to headings
 * based upon heading weight
 * @method addHashes
 * @param  {Number}  count [description]
 */
const addHashes = (count) =>{
  count = Number(count);
  let string = '';
  for (let x = 0; x < count; x++) {
    string += '#'
  }
  return string;
}



const makeRegex = (regex, doc, before, after, replaceFn) =>{
  let matches = [];
  let newDoc = doc;
  let replaceString;
  while (matches = regex.exec(doc)) {

    if (matches && matches[1]) {
      replaceString = before || '';
      let replaceText = matches[1].trim();

      if (replaceFn && typeof (replaceFn) === 'function') {
        replaceText = replaceFn(matches)
      }
      replaceString += replaceText;
      replaceString += after || '';
      newDoc = newDoc.replace(matches[0], replaceString);
    }
  }
  return newDoc
}

const Formatters = {
  /**
   * @description executes a regex to replace matched text with
   * selected group with optional pre and postfix
   * @method makeRegex
   * @param  {RegExp}  regex  [description]
   * @param  {String}  doc    [description]
   * @param  {String}  before [description]
   * @param  {String}  after  [description]
   * @param replaceFn
   * @return {String}         [description]
   */


  /**
   * @description replaces html headings with equalent markdown
   * syntax
   * @method replaceHeading
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
   replaceHeading: (doc) =>{
    return makeRegex(headingRegex, doc, null, null, function (match) {
      return addHashes(match[1]) + match[2]
    });
  },

  /**
   * @description replaces ul section with equalent markdown
   * syntax
   * @method replaceUl
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
   replaceUl: (doc) => {
    return makeRegex(ulRegex, doc, null, null, function (match) {
      return Formatters.replaceLi(match[1], 'ul')
    });
  },

  /**
   * @description replaces ol section with equalent markdown
   * syntax
   * @method replaceOl
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
  replaceOl: (doc) => {
    return makeRegex(olRegex, doc, null, null, function (match) {
      return Formatters.replaceLi(match[1], 'ol')
    });
  },

  /**
   * @description replaces paragraph section with equalent markdown
   * syntax
   * @method replaceParagraph
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
  replaceParagraph : (doc) => {
    return makeRegex(pRegex, doc);
  },

  /**
   * @description replaces pre section with equalent markdown
   * syntax
   * @method replacePre
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
  replacePre : (doc) => {
    return makeRegex(preRegex, doc, '`', '`');
  },

  /**
   * @description replaces blockquote section with equalent markdown
   * syntax
   * @method replaceBlockQuote
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
   replaceBlockQuote : (doc) => {
    return makeRegex(blockQuoteRegex, doc, '> ');
  },

  /**
   * @description replaces bold|strong section with equalent markdown
   * syntax
   * @method replaceBold
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
   replaceBold : (doc) => {
    return makeRegex(boldRegex, doc, '**', '**');
  },

  /**
   * @description replaces i|em section with equalent markdown
   * syntax
   * @method replaceItalic
   * @param  {String}       doc [description]
   * @return {String}           [description]
   */
   replaceItalic :(doc) =>{
    return makeRegex(italicRegex, doc, '*', '*');
  },

   replaceHref : (doc) =>{
    return makeRegex(hrefRegex, doc, null, null, function (match) {
      return `[${match[2]}](${match[1]})`
    })
  },

   replaceBr : (doc) => {
    return doc.replace(brRegex, '\n');
  },

  /**
   * @description replaces li tags with equalent markup based
   * upon their parent tag
   * @method replaceLi
   * @param  {String}  doc [description]
   * @param  {String}  tag [description]
   * @return {String}      [description]
   */
   replaceLi : (doc, tag) => {
    let matches = [];
    let newDoc = doc;
    let replaceIndex = 0;
    let replaceTag = '';
    while (matches = liRegex.exec(doc)) {
      if (matches && matches[1]) {
        if (tag !== 'ul') {
          replaceIndex++;
          replaceTag = replaceIndex + '. ';
        } else {
          replaceTag = '* ';
        }
        newDoc = newDoc.replace(matches[0], replaceTag + matches[1].trim());
      }
    }
    return newDoc
  },



}

export default Formatters
