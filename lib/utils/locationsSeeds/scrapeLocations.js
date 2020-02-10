const request = require('superagent');
const { parse } = require('node-html-parser');
const fs = require('fs');

const scrapeLocationInfo = () => {
  return request.get('https://steven-universe.fandom.com/wiki/Category:Locations')
    .then(res => parse(res.text))
    .then(html => {

      let locationLinks = html
        .querySelectorAll('.category-page__member-link')
        .map(i => 'https://steven-universe.fandom.com' + i.rawAttrs.split('"')[1])
        .filter(i => { if(!i.includes('Category')) return i; });

      return Promise.all(locationLinks.map(link => {
        return request.get(link)
          .then(res => parse(res.text))
          .then(html => {

            const name = html.querySelectorAll('.pi-title').map(label => label.structuredText)[0];

            let image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
            if(!image) image = html.querySelector('.thumbimage') ? html.querySelector('.thumbimage').rawAttrs.split('"')[1] : null;

            const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
            const values = html.querySelectorAll('div .pi-data-value') ? html.querySelectorAll('div .pi-data-value').map(value => value.structuredText) : null;
            
            const info = labels.reduce((acc, val, i) => {
              let label = val
                .replace(/[ ]/g, '_')
                .replace(/[()]/g, '')
                .toLowerCase();
              if(label === 'debut') label = 'first';

              const stringKeys = new Set(['type', 'location', 'first', 'latest', 'owner']);
              
              if(label === 'name' && values[i].length) acc[label] = values[i];
              else if(stringKeys.has(label)) acc[label] = values[i].split('\n')[0];
              else acc[label] = values[i].split('\n');
              
              return acc;
            }, {});

            return {
              name,
              image,
              ...info
            };
          });
      }));
    })
    .then(obs => {
      fs.writeFile('./lib/utils/locationsSeeds/locations.json', JSON.stringify(obs, null, 2), (err) => {
        if(err) throw err;
        console.log('The file has been saved!');
      });
    })
    .catch(e => console.log(e));
};


scrapeLocationInfo();
