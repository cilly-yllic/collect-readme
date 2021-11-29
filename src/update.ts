import { join } from 'path';
import { get, write } from './readme';
import { File, Files } from './interface';

export const update = (content, file: File) => content.replace( new RegExp( `\\[.+\\]\\(${file.url}\\)` ), file.line )

export const insert = (content, file: File) => {
  return `${content}\n\n${file.line}`
}

const getChildren = (path: string, files: Files) => {
  const paths = path.split('/')
  return files.reduce((acc, file) => {
    const filePaths = (file.path as string).split('/')
    if ( paths.every((p, i) => p === filePaths[i]) && paths.length < filePaths.length ) {
      acc.push(file)
    }
    return acc
  }, [] as Files)
}

const getReadme = ( readme: string, file: File ): string => {
  if ( readme.search( new RegExp( `\\[${file.title}\\]\\(${file.url}\\)` ) ) !== - 1 ) return readme
  if ( readme.search( new RegExp( `\\[.+\\]\\(${file.url}\\)` ) ) !== - 1 ) update( readme, file )
  return insert(readme, file)
}

const updates = (absolutePath: string, files: Files) => files.reduce((acc, file) => getReadme(acc, file), get(absolutePath))

export default (cwd, files: Files) => {
  console.log('files', files)
  write(cwd, updates(cwd, files).trim())
  files.forEach(file => {
    if (!file.setting.children) {
      return
    }
    const absolutePath = join(cwd, file.path);
    write(absolutePath, updates(absolutePath, getChildren(file.path, files)).trim())
  } )
}
