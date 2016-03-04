var tagRegExp = /\[[^\[\]]*?\]/g;

module.exports = function parseStringTags(s) {
  if (typeof s !== 'string') {
    throw new Error('String required');
  }

  var tags = [];
  var matches = s.match(tagRegExp);

  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      var tag = matches[i];
      s = s.replace(tag, '');
      var normalizedTag = tag.slice(1, -1).toLowerCase();

      // Add tag only if not blank and not a duplicat
      if (normalizedTag.length > 0 && tags.indexOf(normalizedTag) === -1) {
        tags.push(normalizedTag);
      }
    }
  }

  return {
    string: s,
    tags: tags
  };
};
