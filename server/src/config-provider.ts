import * as fs from 'fs';
import * as path from 'path';

const configPath = path.normalize(path.join(__dirname, '..', 'config.json'));
console.log(configPath);
export default  {
    provide: 'CONFIG',
    useValue: JSON.parse(fs.readFileSync(configPath, 'utf-8'))
}