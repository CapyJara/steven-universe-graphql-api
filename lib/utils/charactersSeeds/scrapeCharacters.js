const request = require('superagent');
const { parse } = require('node-html-parser');
const nonCharacterLinks = require('./nonCharacterLinks.json');
const fs = require('fs');

const scrapeCharacterInfo = () => {
  return Promise.all([
    request.get('https://steven-universe.fandom.com/wiki/Category:Characters'),
    request.get('https://steven-universe.fandom.com/wiki/Category:Characters?from=Rhodonite'),
  ]) 
    .then(res => res.map(i => parse(i.text)))
    .then(html => {
      
      let characterLinks = html
        .reduce((acc, val) => {
          const links = val
            .querySelectorAll('.category-page__member-link')
            .map(i => 'https://steven-universe.fandom.com' + i.rawAttrs.split('"')[1])
            .filter(i => { if(!i.includes('Category') && !i.includes('Future') && !i.includes('Season') && !i.includes('Movie')) return i; });
      
          return [...acc, ...links];
        }, []);
      return Promise.all(characterLinks.map(link => {
        if(nonCharacterLinks.includes(link)) return null;
        return request.get(link)
          .then(res => parse(res.text))
          .then(html => {

            const name = html.querySelectorAll('.pi-title').map(label => label.structuredText)[0];

            let image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
            if(!image) image = html.querySelector('.thumbimage') ? html.querySelector('.thumbimage').rawAttrs.split('"')[1] : null;

            const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
            const values = html.querySelectorAll('div .pi-data-value') ? html.querySelectorAll('div .pi-data-value').map(value => value.structuredText) : null;
            
            const info = labels.reduce((acc, val, i) => {
              const label = val
                .replace(/[ ]/g, '_')
                .replace(/[()]/g, '')
                .toLowerCase();

              acc[label] = values[i].split('\n');
              return acc;
            }, {});

            return {
              name,
              image,
              ...info
            };
          });
      })
        .filter(i => { if(i) return i; }))
        .then(chars => {
          fs.writeFile('./lib/utils/charactersSeeds/characters.json', JSON.stringify(chars, null, 2), (err) => {
            if(err) throw err;
            console.log('The file has been saved!');
          });
        });
    })
    .catch(e => console.log(e));
};

scrapeCharacterInfo();
