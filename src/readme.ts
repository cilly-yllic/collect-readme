import { readFile, writeFile } from './fs';
import { Setting } from './interface';
import config from './config';

export const get = (path: string): string => readFile( path.search(/\/README\.md$/) !== - 1 ? path : `${path}/README.md`, 'utf8') as string
export const write = (path: string, content: string): void => writeFile(`${path}/README.md`, content);

export const getTitle = (data) => {
  const match = data.match( /#\s*(.+)\s*\n/ );
  return !!match ? match[1] : 'ref'
}

export const getSetting = (data: string): Setting => {
  const ENTER = '@'
  const reg = new RegExp(ENTER, 'g')
  const setting = data.replace( /\n/g, ENTER ).match( config.PARAM_REG_EXP )
  if (!setting) {
    return {}
  }
  return setting[1].replace(reg, '\n').split( '\n' ).reduce((acc, line) => {
    if (!line) {
      return acc
    }
    const param = line.match( /\s*(\w+)\s*:\s(\w+)\s*/ )
    if (!param) {
      return acc
    }
    acc[param[1]] = param[2]
    return acc
  }, {} as Setting);
}
