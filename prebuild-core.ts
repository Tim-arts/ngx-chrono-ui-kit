(function () {
  const fs = require('fs');
  const fse = require('fs-extra');
  const folder = '../../dist';

  if (fs.existsSync(folder)) {
    emptyFolder(folder);
  } else {
    console.log("dist folder doesn't exist, skipping");
  }

  function emptyFolder(folder) {
    fse.emptyDirSync(folder);
    console.log('dist folder has been emptied with success');
  }
})();
