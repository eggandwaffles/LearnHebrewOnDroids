function sanitize (string) {
    //delete spaces to aid in parsing
    const regex = /\s+/ig
    var condensedString = string.replaceAll(regex, '')
    //check 1: trailing commas
    const check1Regex = /,\}/ig
    var sanitizedString = condensedString.replaceAll(check1Regex, '}')

    return sanitizedString
}

module.exports = { sanitize }