const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

// chamadas que o nosso servidor poderá receber
// Ao acessar o endereço '/' o servidor o servidor executará a função e irá responder com um 'Hello World!'
// Pelo request é possível saber algumas informações do usuário, como o navegador que está sendo usado
server.get('/', async (request, response) => {
  const url = 'https://idfed.mpsa.com/idp/startSSO.ping?PartnerSpId=https%3A%2F%2Fcrmfcalatam.my.site.com%2Fgrow';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.type('#username', 'DM08605');
  await page.type('#password', 'To291123');
  const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.keyboard.press('Enter');
  await navigationPromise;

  console.log('Aguardando redirecionamento...');
  // await page.waitForNavigation();
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(2000);
  await page.screenshot({path: 'example.png'});

  // // Coleta a informação do texto
  // const pageContent = await page.evaluate(() => {
  //   return {
  //     // Selecionar a informação, pode ser só o Texto (innerText) ou o HTML (innerHTML)
  //     // O . indica que é uma classe, o # indica que é um id
  //     subtitle: document.querySelector('.ping-button').innerText,
  //   };
  // });

  await browser.close();

  response.send({
    hello: 'world'
    // browser: pageContent.subtitle
  });
});

const port = 3000;
// Acessar o servidor criado
// O listen escuta todas as requisições que chegam na porta especificada, nesse caso, 3000
server.listen(port, () => {
  console.log(`
    'Servidor subiu com sucesso! TMNT'
    acesse em http://localhost:${port}
  `);
});

// (async () => {
  // 
// })();
