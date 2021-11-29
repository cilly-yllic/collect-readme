import { readDir } from './fs';
import { relative } from 'path';
import { success } from './log';
import { get, getTitle, getSetting } from './readme';
import { File, Files } from './interface';

const EXCLUDE_DIRS = [ '.idea', '.git', 'node_modules' ]

const isReadme = (file: string) => file.search(/README\.md$/) !== -1
const excludes = (cwd: string, filePath: string, { excludes, includes }) => {
  const path = relative(cwd, filePath)
  if (excludes.length) {
    return !excludes.some(exclude => path.search(exclude) !== - 1)
  }
  if (includes.length) {
    return includes.some(include => path.search(include) !== - 1)
  }
  return true
}
const getReadme = (cwd: string, filePath: string, settings): File => {
  const readme = get(filePath)
  // console.log('readme', readme)
  const path = relative(cwd, filePath).replace('/README.md', '')
  const url = `${settings.repository}/${path}`
  const setting = getSetting(readme)
  const title = setting !== undefined && setting.title ? setting.title : getTitle(readme)
  return {
    path,
    url,
    title,
    line: `[${title}](${url})`,
    file: readme,
    setting
  }
}

const dirs = (cwd, path, settings): Files => {
  const data = readDir(path)
  const files = data.files.filter(isReadme).filter(file => excludes(cwd, file, settings)).map(file => getReadme(cwd, file, settings))
  return data.dirs.reduce((acc, dir) => acc.concat(dirs(cwd, dir, settings)), files)
}

export default (cwd, settings): Files => {
  return readDir(cwd).dirs.reduce( (acc, dir) => {
    if (EXCLUDE_DIRS.concat(settings.exclude_dirs).some(exclude_dir => dir.search(new RegExp(`${exclude_dir}$`)) !== -1)) {
      return acc
    }
    success(dir)
    return acc.concat(dirs(cwd, dir, settings))
  }, [] as Files)
}
