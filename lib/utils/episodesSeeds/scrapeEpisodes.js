const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeEpisodeInfo = () => {
  return request.get('https://steven-universe.fandom.com/wiki/Category:Episodes')
    .then(res => parse(res.text))
    .then(html => {

      let episodeLinks = html
        .querySelectorAll('.category-page__member-link')
        .map(i => 'https://steven-universe.fandom.com' + i.rawAttrs.split('"')[1])
        .filter(i => { if(!i.includes('Category')) return i; });

      return Promise.all(episodeLinks.map(link => {
        return request.get(link)
          .then(res => parse(res.text))
          .then(html => {

            const name = html.querySelectorAll('.pi-title').map(label => label.structuredText)[0];

            let image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
            if(!image) image = html.querySelector('.thumbimage') ? html.querySelector('.thumbimage').rawAttrs.split('"')[1] : null;
            
            const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
            const values = html.querySelectorAll('.pi-data-value') ? html.querySelectorAll('.pi-data-value').map(value => value.structuredText) : null;
            
            const info = labels.reduce((acc, val, i) => {
            
              let label = val
                .replace(/[ ]/g, '_')
                .replace(/[()]/g, '')
                .toLowerCase();
              
              const unwantedKeys = new Set(['production_code', 'viewers']);
              if(unwantedKeys.has(label)) return acc;

              const stringKeys = new Set(['season', 'episode', 'overall', 'previous', 'next']);
              if(stringKeys.has(label)) acc[label] = values[i].split('\n')[0];

              else acc[label] = values[i].split('\n');
              
              return acc;
            }, {});

            return {
              name,
              image,
              ...info
            };
          })
          .catch(e => console.log(e));
      }));
    });
};

module.exports = scrapeEpisodeInfo;


