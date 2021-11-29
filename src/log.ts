import chalk from 'chalk';

export const error      = ( value: string ): void => console.log( chalk.bold.red( value ) );
export const warning    = ( value: string ): void => console.log( chalk.bold.yellow( value ) );
export const success    = ( value: string ): void => console.log( chalk.bold.green( value ) );
export const info       = ( value: string ): void => console.log( chalk.bold.blue( value ) );
