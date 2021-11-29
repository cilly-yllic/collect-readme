export interface Setting {
  [key: string]: string | boolean | number
}

export interface File {
  path: string,
  url: string,
  title: string,
  line: string,
  file: string,
  setting: Setting
}

export type Files = File[]
