import { join } from 'path'
import { exists, readJson } from './fs'
import packageJson from '../package.json';

export default (cwd, path): Object => {
  const filePath = join( cwd, path )
  const settings = exists(filePath) ? readJson(filePath) : {}
  return {
    repository: packageJson.repository.url.replace(/.*(https?:\/\/.+)\.git$/, '$1'),
    ...settings,
    excludes: (settings.include_paths === undefined || !settings.include_paths.length) && settings.exclude_paths !== undefined ? settings.exclude_paths.map(path => new RegExp(path)) : [],
    includes: settings.include_paths !== undefined ? settings.include_paths.map(path => new RegExp(path)) : []
  }
}
