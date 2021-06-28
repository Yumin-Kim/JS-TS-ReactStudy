var Scraper = require('images-scraper');

var request = require('request');
var fs = require('fs');

const google = new Scraper({
    puppeteer: {
        headless: false,
    }
});
let num = 0;
(async () => {
    const results = await google.scrape('fly drone', 200);
    await results.forEach((val)=>{
        download( val.url,`new_${num}.png`, function () {
            console.log('done');
        }) 
        num++;
    })

})();
var download = function (uri, filename, callback) {
    console.log(uri)
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};