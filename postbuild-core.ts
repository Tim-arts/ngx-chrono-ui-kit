((): void => {
  const path = require('path');
  const fs = require('fs');
  const fse = require('fs-extra');

  // Copies the .npmrc inside the dist folder to have the authorization to publish the UI Kit
  ((): void => {
    const folder: string = './dist/core';
    const file: string = '.npmrc';

    if (fs.existsSync(folder)) {
      if (fs.existsSync(path.join('./', file))) {
        fse.copySync(
            path.resolve(__dirname, path.join('./', file)),
            path.join(folder, file),
        );
        console.log(`${file} file has been copied with success`);
      } else {
        throw new Error(
            `The file ${file} does not exist. Please check https://dev.azure.com/projetsrtm/EXO%20UI%20Kit/_packaging?_a=connect&feed=Chrono_UI_Kit before publishing the package.`,
        );
      }
    }
  })();
})();

