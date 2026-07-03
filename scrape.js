const https = require('https');

https.get('https://mayleneee01.github.io/Protofolio-ZhicoPradita/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const fs = require('fs');
    fs.writeFileSync('scraped.html', data);
    console.log('Scraped successfully');
  });
});
