import * as path from 'path';
import * as colors from 'colors/safe';
import * as fs from 'fs';
import * as packageJson from '../package.json';

// tsc build.pre.ts --resolveJsonModule --outDir ./dist to compile

const appVersion = packageJson.version;

const date = new Date();

console.log(colors.cyan('\nRunning pre-build tasks'));

const versionFilePath = path.join(__dirname + '/../src/environments/global.const.ts');

const src = `// this file was updated on ${date}
export const WEB_VERSION = '${appVersion}';
`;

// ensure version module pulls value from package.json
fs.writeFile(versionFilePath, src, {}, function (err) {
	if (err) {
		return console.log(colors.red(err.message));
	}

	console.log(colors.green(`Updating application version ${colors.yellow(appVersion)}`));
	console.log(`${colors.green('Writing version module to ')}${colors.yellow(versionFilePath)}\n`);
});
