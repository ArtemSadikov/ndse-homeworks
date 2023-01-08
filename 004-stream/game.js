const fs = require( 'fs' );
const path = require( 'path' );
const readline = require('readline');
const { question } = require( '../utils/rl-question' );

const LOG_FILE_PATH = path.join('log', 'game.log');
const TITLE_DELIMITER = '№';
const TAIL_OF_COIN = 0;
const EAGLE_OF_COIN = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) {
      fs.mkdirSync(path.dirname(LOG_FILE_PATH), { recursive: true });
      fs.writeFileSync(LOG_FILE_PATH, '');
    }
    const loggingFileContent = fs.readFileSync(LOG_FILE_PATH).toString();
    const titles = loggingFileContent.match(/Партия\s№\d+/g);
    const lastBattleNumber = Math.max(...(titles || ['Партия ' + TITLE_DELIMITER + 0]).map(v => Number.parseInt(v.split(TITLE_DELIMITER)[1])))
    const newBattleNumber = lastBattleNumber + 1;

    fs.appendFileSync(LOG_FILE_PATH, 'Партия ' + TITLE_DELIMITER + newBattleNumber + '\n');

    console.log('Начинаем партию ' + TITLE_DELIMITER + newBattleNumber);
    /** @type {TAIL_OF_COIN | EAGLE_OF_COIN} */
    const coinThrowResult = Math.round(Math.random());
    if (Number.isNaN(Number.parseInt(coinThrowResult))) {
      throw new Error('Введено некорректное значение. Попробуйте снова.');
    }
    const userAnswerInput = await question(rl, 'Монета брошена, какой результат?\n(Введите 0 (решка) или 1 (орел))\n');
    const logMessage = [(userAnswerInput) == coinThrowResult ? 'Победа' : 'Поражение', 'пользователя!'].join(' ');
    console.log(logMessage);
    fs.appendFileSync(LOG_FILE_PATH, logMessage + '\n');
    console.log('Результат партии сохранен.\nИсторию партий можно посмотреть по пути', LOG_FILE_PATH);
    process.exit(0);
  } catch (err) {
    console.error('Программа завершилась с ошибкой: ', err);
    process.exit(1);
  }
}

main();
