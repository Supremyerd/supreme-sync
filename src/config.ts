import 'dotenv/config';
const getEnv :(value :string) => string | undefined = (value :string) => process.env[value.toUpperCase()];


export const port = getEnv('port');