#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const FORMATS = {
  ISO: 'iso',
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date',
};

const COMMAND_VALUES = {
  CURRENT: 'current',
  ADD: 'add',
  SUB: 'sub',
}

const getOptions = (isBool = true) => ({
  [FORMATS.YEAR]: {
    alias: 'y',
    describe: 'year format',
    boolean: isBool,
    number: !isBool,
  },
  [FORMATS.MONTH]: {
    alias: 'm',
    describe: 'month format',
    boolean: isBool,
    number: !isBool,
  },
  [FORMATS.DATE]: {
    alias: 'd',
    describe: 'date-of-month format',
    boolean: isBool,
    number: !isBool,
  }
})

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [format] [options]')
  .command(COMMAND_VALUES.CURRENT, 'Get current date', getOptions(true))
  .command(COMMAND_VALUES.ADD, 'Add to current date', getOptions(false))
  .command(COMMAND_VALUES.SUB, 'Sub from current date', getOptions(false))
  .demandCommand(1)
  .nargs(COMMAND_VALUES.CURRENT, 1)
  .nargs(COMMAND_VALUES.ADD, 1)
  .nargs(COMMAND_VALUES.SUB, 1)
  .help('h')
  .version('v', '1.0.0')
  .argv;

const getParsedValueForMath = (op, format) => {
  return op === COMMAND_VALUES.ADD ? argv[format] : -argv[format]
}

let result = undefined;
const currentDate = new Date();

switch (argv._[0]) {
  case COMMAND_VALUES.CURRENT:
    result = currentDate.toISOString();

    if (argv[FORMATS.YEAR]) {
      result = currentDate.getFullYear();
    } else if (argv[FORMATS.MONTH]) {
      result = currentDate.getMonth() + 1;
    } else if (argv[FORMATS.DATE]) {
      result = currentDate.getDate();
    }
    break;
  default:
    if (argv[FORMATS.YEAR]) {
      const newYear = currentDate.getFullYear() + getParsedValueForMath(argv._[0], FORMATS.YEAR);
      currentDate.setFullYear(newYear);
      result = currentDate.getFullYear();
    } else if (argv[FORMATS.MONTH]) {
      const newMonth = currentDate.getMonth() + getParsedValueForMath(argv._[0], FORMATS.MONTH);
      currentDate.setMonth(newMonth);
      result = currentDate.getMonth() + 1;
    } else if (argv[FORMATS.DATE]) {
      const newDate = currentDate.getDate() + getParsedValueForMath(argv._[0], FORMATS.DATE);
      currentDate.setDate(newDate);
      result = currentDate.getDate();
    }
}
console.log(String(result));

