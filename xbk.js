const fetch = require('node-fetch');

async function run() {
  const re = /http:\/\/new\.xianbao\.fun\/plus\/json\/push.json/;
  const url = 'http://new.xianbao.fun/plus/json/push.json';
  const init = {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  };
  const response = await fetch(url, init);
  const json = await response.json();
  const huoqujson = process.env.huoqujson || '';
  const regex = new RegExp(`(${huoqujson})`, 'g');
  let postdata = '';
  for (let i = 0; i < json.length; i++) {
    const id = json[i].id;
    if (!regex.test(id)) {
      const { title, url, date } = json[i];
      postdata += `${title} ${url} ${date}\n\n`;
      process.env.huoqujson += `${id}|`;
    }
  }
  const barkurl = process.env.barkurl || '';
  const options = {
    method: 'POST',
    body: postdata,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };
  await fetch(barkurl, options);
  console.log('success');
}

run();
