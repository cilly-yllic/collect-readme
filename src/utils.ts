// import { basename, extname, dirname } from 'path';
export const getValueType = ( value: any ): string => Object.prototype.toString.call( value ).slice( 8, - 1 );
export const isString     = ( value: any ): boolean => getValueType( value ) === 'String';
export const isArray      = ( value: any ): boolean => getValueType( value ) === 'Array';
export const isObject     = ( value: any ): boolean => getValueType( value ) === 'Object';

export const isJson       = (json ): boolean => {
  if ( typeof json !== 'string' ) {
    return false;
  }
  try {
    JSON.parse( json );
  } catch ( err ) {
    return false;
  }
  return true;
}
