const fs = require('fs');
const { LOG_FILE_PATH } = require( './constants/log-file-path' );
const readline = require('readline');

async function main() {
  const logFileRStr = readline.createInterface({
    input: fs.createReadStream(LOG_FILE_PATH),
    console: false,
  })
  let totalWins = 0, totalFails = 0, totalGames = 0;

  await new Promise((res, rej) => {
    logFileRStr.on('line', (chunk) => {
      totalGames++;
      const isWin = (chunk.toString().match(/Победа/g) || []).length > 0 ? true : false;
      if (isWin) totalWins++;
      else totalFails++;
    });

    logFileRStr.on('close', () => {
      res();
    })

    logFileRStr.on('error', (err) => {
      console.error(err);
      rej(err)
    })
  })

  console.log('Всего партий сыграно - ', totalGames);
  console.log('Всего партий выиграно - ', totalWins);
  console.log('Всего партий проиграно - ', totalFails);
  const oneProcent = totalGames / 100;
  console.log('Процентное соотношение побед к поражениям - ', Number(totalWins / oneProcent).toFixed(0) + '%', '/', Number(totalFails / oneProcent).toFixed(0) + '%');

  process.exit(0);
}

main();
