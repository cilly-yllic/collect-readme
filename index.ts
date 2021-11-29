#!/usr/bin/env node
import program from 'commander';
import { join } from 'path';
import packageJson from './package.json';

import config from './src/config';
import { info } from './src/log';
import setting from './src/setting';
import readmes from './src/readmes';
import update from './src/update';

export default function ( cwd: string = join( __dirname, '../..' ) ): void {
  // console.log('cwd', cwd)
  // console.log('packageJson', packageJson.version)
  program.version( packageJson.version, '-v, --version' );
  program.command( 'generate' )
      .alias( 'g' )
      .option( '-s, --setting [path]', 'setting file path from package.json', config.SETTING_FILE_PATH )
      .action( ( command ) => {
        info( '> run collect-readme' );
        update(cwd, readmes(cwd, setting(cwd, command.setting)))
      } )
      .on('--help', () => {
        console.log( '  Examples:' );
        console.log();
        console.log( `    $ ${config.NAME} g` );
        console.log();
      });
  // console.log('program', program)

  program.command( '*' ).action( () => program.help() );

  program.parse(process.argv);
}
