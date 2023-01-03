#!/usr/bin/env node

const { createInterface } = require('readline');

const MAX_RANGE = 100;
const MIN_RANGE = 1;

const quizValue = Math.round(Math.random() * (MAX_RANGE - MIN_RANGE));

let input = undefined;
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = () => new Promise((res, rej) => {
  rl.question('Введите число: ', (val) => {
    const result = Number.parseInt(val);
    result === Number.NaN ? rej('Не валидный формат цифры: ' + val) : res(result);
  })
})

async function main() {
  console.log('Загадано число в диапазоне от', MIN_RANGE, 'до', MAX_RANGE);
  do {
    input = await question();
    if (quizValue !== input) {
      console.log(input > quizValue ? 'Меньше' : 'Больше');
    } else {
      console.log('Отгадано число', quizValue);
    }
  } while (quizValue !== input);
  console.log('Пока!');
  process.exit(0);
}

main();

