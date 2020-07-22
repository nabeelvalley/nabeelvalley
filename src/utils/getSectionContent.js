/**
 * Convert link data to its corresponding markdown list element
 * @param {{name:string, url:string}}
 * @returns {string}
 */
const toListItem = ({ name, url }) => {
  return `- [${name}](${url})`
}

/**
 * Convert array of links their to markdown representation
 * @param {{name:string, url:string}[]} data
 * @returns {string}
 */
const getSectionContent = (data) => {
  return data.slice(0, 5).map(toListItem).join('\n')
}

module.exports = getSectionContent
