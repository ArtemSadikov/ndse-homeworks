#!/usr/bin/env node
require('dotenv').config()
const http = require('http');
const config = require( './config/config' );
const url = require('url');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const path = require( 'path' );

// const server = http.createServer((req, res) => {
//   const { pathname, query } = url.parse(req.url);

//   if ()
// });

// server.listen(process.env.PORT || config.PORT, process.env.HOST || config.HOST, () => {
//   console.log('Listening server');
// })

const AVAILABLE_COMMANDS = {
  CURRENT: 'current',
  HISTORICAL: 'historical',
  FORECAST: 'forecast',
}

const GLOBAL_OPTIONS = {
  QUERY: 'query',
  UNITS: 'units',
  LANGUAGE: 'language',
}

const HISTORICAL_COMMAND_OPTIONS = {
  HISTORICAL_DATE_START: 'historical_date_start',
  HISTORICAL_DATE_END: 'historical_date_end',
  HOURLY: 'hourly',
  INTERVAL: 'interval',
}

const FORECAST_COMMAND_OPTIONS = {
  FORECAST_DAYS: 'forecast_days',
  HOURLY: 'hourly',
  INTERVAL: 'interval',
}

const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options] value')
    .command(AVAILABLE_COMMANDS.CURRENT, 'Get current weather in city')
    .command(AVAILABLE_COMMANDS.HISTORICAL, 'In addition to looking up historical weather data for specific dates', {
      [HISTORICAL_COMMAND_OPTIONS.HISTORICAL_DATE_START]: {
        demand: true,
        alias: 's',
        string: true,
        description: 'Use this parameter to pass a start date for the current historical time-series request',
      },
      [HISTORICAL_COMMAND_OPTIONS.HISTORICAL_DATE_END]: {
        demand: true,
        alias: 'e',
        string: true,
        description: 'Use this parameter to pass an end date for the current historical time-series request',
      },
      [HISTORICAL_COMMAND_OPTIONS.HOURLY]: {
        alias: 'h',
        boolean: true,
        description: 'Set this parameter depending on whether or not you want the API to return weather data split hourly'
      },
      [HISTORICAL_COMMAND_OPTIONS.INTERVAL]: {
        alias: 'i',
        number: true,
        description: 'If hourly data is enabled, use this parameter to define the interval'
      }
    })
    .command(AVAILABLE_COMMANDS.FORECAST, 'The weatherstack is capable of returning weather forecast data for up to 14 days into the future', {
      [FORECAST_COMMAND_OPTIONS.FORECAST_DAYS]: {
        number: true,
        alias: 'd',
        description: 'Use this parameter to specify the number of days for which the API returns forecast data'
      },
      [HISTORICAL_COMMAND_OPTIONS.HOURLY]: {
        alias: 'h',
        boolean: true,
        description: 'Set this parameter depending on whether or not you want the API to return weather data split hourly'
      },
      [HISTORICAL_COMMAND_OPTIONS.INTERVAL]: {
        alias: 'i',
        number: true,
        description: 'If hourly data is enabled, use this parameter to define the interval'
      }
    })
    .options({
      [GLOBAL_OPTIONS.QUERY]: {
        demand: true,
        string: true,
        alias: 'q',
        description: 'Use this parameter to pass a single location or multiple semicolon-separated location identifiers'
      },
      [GLOBAL_OPTIONS.UNITS]: {
        choices: ['m', 's', 'f'],
        alias: 'u',
        description: 'Use this parameter to pass one of the unit identifiers'
      },
      [GLOBAL_OPTIONS.LANGUAGE]: {
        alias: 'l',
        string: true,
        description: 'Use this parameter to specify your preferred API response language using its ISO-code.'
      }
    })
    .demandCommand(1)
    .help()
    .version('0.0.1')
    .argv;


async function main() {
  const command = argv._[0];
  const url = new URL(command, process.env.API_URL || config.API_URL)
  url.searchParams.append('access_key', process.env.API_KEY || config.API_KEY)

  url.searchParams.append(GLOBAL_OPTIONS.QUERY, argv.q);
  if (argv.u) {
    url.searchParams.append(GLOBAL_OPTIONS.UNITS, argv.u);
  }

  if (argv.l) {
    url.searchParams.append(GLOBAL_OPTIONS.LANGUAGE, argv.l);
  }

  if (command === AVAILABLE_COMMANDS.HISTORICAL) {
    url.searchParams.append(
      HISTORICAL_COMMAND_OPTIONS.HISTORICAL_DATE_START, new Date(argv.s).toISOString().split('T')[0]
    );
    url.searchParams.append(
      HISTORICAL_COMMAND_OPTIONS.HISTORICAL_DATE_END, new Date(argv.e).toISOString().split('T')[0]
    );
    if (argv.h) {
      url.searchParams.append(FORECAST_COMMAND_OPTIONS.HOURLY, argv.h);
    }
    if (argv.i) {
      url.searchParams.append(FORECAST_COMMAND_OPTIONS.INTERVAL, argv.i);
    }
  }

  if (command === AVAILABLE_COMMANDS.FORECAST) {
    if (argv.d) {
      url.searchParams.append(FORECAST_COMMAND_OPTIONS.FORECAST_DAYS, argv.d);
    }
    if (argv.h) {
      url.searchParams.append(FORECAST_COMMAND_OPTIONS.HOURLY, argv.h);
    }
    if (argv.i) {
      url.searchParams.append(FORECAST_COMMAND_OPTIONS.INTERVAL, argv.i);
    }
  }

  http.get(url, (res) => {
    let response = '';
    res.setEncoding('utf-8')
    res.on('data', (chunk) => {
      response += chunk;
    })
    res.on('end', () => {
      try {
        response = JSON.parse(response);
        console.log(response);
      } catch (err) {
        console.error('failed to parse api response', err);
      }
    })
  }).on('error', () => {
    console.error('Errored request', err);
  })
}

main();
