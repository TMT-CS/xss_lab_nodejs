const levels = [
  {
    id: 1,
    slug: 'level1',
    title: 'Reflected XSS into attribute with angle brackets HTML-encoded',
    shortTitle: 'Attribute context',
    description: 'Input is reflected inside an HTML attribute. Angle brackets are encoded.',
    method: 'GET'
  },
  {
    id: 2,
    slug: 'level2',
    title: 'Reflected XSS into a JavaScript string with angle brackets HTML-encoded',
    shortTitle: 'JavaScript string',
    description: 'Input is reflected into a JavaScript string. Angle brackets are encoded.',
    method: 'GET'
  },
  {
    id: 3,
    slug: 'level3',
    title: 'Reflected XSS into HTML context with most tags and attributes blocked',
    shortTitle: 'HTML filtered',
    description: 'Input is reflected into HTML using GET. Most tags and common attributes are filtered.',
    method: 'GET'
  },
  {
    id: 4,
    slug: 'level4',
    title: 'Reflected XSS into HTML context with all tags blocked except custom ones',
    shortTitle: 'Custom tags only',
    description: 'Input is reflected into HTML using GET. Standard HTML tags are blocked and only custom tags are allowed.',
    method: 'GET'
  },
  {
    id: 5,
    slug: 'level5',
    title: 'Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped',
    shortTitle: 'JS string + quotes',
    description: 'Input is reflected into JavaScript with extra quote handling.',
    method: 'GET'
  }
];

function getLevelBySlug(slug) {
  return levels.find((level) => level.slug === String(slug)) || levels[0];
}

module.exports = {
  levels,
  getLevelBySlug
};
