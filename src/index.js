/**
 * html-to-markdown
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
 */
import Formatters from './formatters';

const extrasRegex = /<\/?(?:div|address|section|article|span)>/gim
const relRegExp = new RegExp(/rel=['|"](.+)['|"]/, `gim`)
const targetRegEx = new RegExp(/rel=['|"](.+)['|"]/, `gim`)
/**
 * @description replacing unncessary html tags
 * @method replaceExtras
 * @param  {String}      doc
 * @return {String}
 */
const replaceExtras = (doc) => {
  let matches = [];
  let newDoc = doc;
  newDoc = newDoc.replace(extrasRegex, '');
  newDoc = newDoc.replace(relRegExp, '');
  newDoc = newDoc.replace(targetRegEx, '');
  console.log(newDoc)
  return newDoc
}


/**
 * @description converts given html to a markdown
 * document
 * @method convert
 * @param  {String} html
 * @return {String}
 */
const htmlToMd = (html) => {

  /**
   * replacing unncessary html tags
   * @type {String}
   */
  html = replaceExtras(html);

  /**
   * looping through registered formatters
   */

  Object.values(Formatters).forEach(f => {
    html = f(html)
  })
  return html;
}


export const addFormatter = (name,formatter) =>{
  Formatters[name] = formatter
}


export default htmlToMd


