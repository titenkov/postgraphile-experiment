const formatDate = (value, locale) => {
  return value
    ? `${new Date(value).toLocaleDateString(locale || 'en', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })}`
    : ''
}

module.exports = {
  formatDate
}
