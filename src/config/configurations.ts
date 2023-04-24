import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
const configFileNameObj = {
  development: 'development',
  production: 'production',
};

const env = process.env.NODE_ENV;
console.log(env, '当前运行的环境', __dirname);

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, `./${configFileNameObj[env]}.yml`), 'utf8'),
  ) as Record<string, any>;
};
