// Tailwind is compiled ahead of time (npm run css) instead of using the play CDN.
module.exports = {
  content: ['./index.html', './js/site.js'],
  theme: { extend: {} },
};
