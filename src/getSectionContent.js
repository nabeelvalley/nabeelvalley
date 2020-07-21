/**
 * Convert link data to its corresponding markdown list element
 * @param {{name:string, url:string}}
 */
const toListItem = ({ name, url }) => {
  return `- [${name}](${url})`
}

/**
 * Array of links to convert to markdown content
 * @param {{name:string, url:string}[]} data
 */
const getSectionContent = (data) => {
  return data.map(toListItem).join('\n')
}

module.exports = getSectionContent
