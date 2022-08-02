const nunjucks = require('nunjucks')
const { formatDate } = require('./utils/format')

const env = new nunjucks.Environment()

env.addFilter('date', (str, locale) => {
  return formatDate(str, locale)
})

module.exports = env
