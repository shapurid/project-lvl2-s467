#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version, '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'diff')
  .action((firstConfig, secondConfig, options) => console.log(
    genDiff(firstConfig, secondConfig, options.format),
  ));

program.parse(process.argv);
