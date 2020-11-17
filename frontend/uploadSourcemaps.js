const path = require('path');
const { upload } = require('sentry-files');
const { version } = require('./package.json');

upload({
  version: version,
  organization: 'marek-borovsky',
  project: 'marek-borovsky',
  token: '98184a90320e435ab4de01a8771ae564686519bd8ffe49cfaa2fe5571c87f583',
  files: getFiles(),
})
.then(data => console.log('----- SUCCESS ----\n', data))
.catch(error => console.log('---- ERROR ----\n', error));

function getFiles() {
  const BUILD_DIR = 'build';
  const buildFile = path.resolve(BUILD_DIR);
  const assetsFile = path.resolve(BUILD_DIR, 'asset-manifest.json');
  const filePaths = require(assetsFile);
  const jsFilesRegex = /(\.js(.map)?)$/;
  const files = filePaths.files;
  return Object.keys(files)
    .filter(f => jsFilesRegex.test(f))
    .map(f => ({
      name: `~/${files[f]}`,
      path: path.resolve(buildFile, files[f].substring(1)),
    }));
}