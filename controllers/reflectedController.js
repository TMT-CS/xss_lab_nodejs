const { levels, getLevelBySlug } = require('../utils/levels');
const { renderLevel } = require('../utils/filters');

function buildView(levelSlug, payload = '') {
  const currentLevel = getLevelBySlug(levelSlug);
  return {
    pageTitle: 'Reflected XSS',
    activePage: 'reflected',
    levels,
    currentLevel,
    payload,
    rendered: renderLevel(currentLevel, payload)
  };
}

function redirectToDefaultLevel(req, res) {
  res.redirect('/reflected/level1');
}

function showReflectedPageBySlug(req, res) {
  const levelSlug = req.params.levelSlug || 'level1';
  const payload = req.query.q || '';
  res.render('reflected', buildView(levelSlug, payload));
}

module.exports = {
  redirectToDefaultLevel,
  showReflectedPageBySlug
};
