import { Dirent } from 'fs';
import { ExecException } from 'child_process';

const {
  promises: { readdir },
} = require('fs');
const child = require('child_process');

interface file {
  file: string;
  folder: string;
  output: string;
}

const sourceDirectory: string = './projects/core/components/';
const filesToOptimize: () => Promise<string[]> = async (): Promise<string[]> => {
  const getDirectories = async (source: string) =>
    (await readdir(source, { withFileTypes: true })).filter((dirent: Dirent) => dirent.isDirectory()).map((dirent: Dirent) => dirent.name);

  return await getDirectories(sourceDirectory);
};

filesToOptimize().then((directories: string[]) => {
  const files: file[] = [];
  directories.forEach((dir: string) => {
    files.push({
      file: `${dir}.component.scss`,
      folder: dir,
      output: `${dir}.component.css`,
    });
  });

  files.forEach((file: file) => {
    child.exec(
        `sass ${sourceDirectory}${file.folder}/${file.file} ${sourceDirectory}${file.folder}/${file.output}`,
        (err: ExecException) => {
          if (err) {
            console.log(`err: ${err}`);
            return;
          }

          child.exec(
              `postcss build ${sourceDirectory}${file.folder}/${file.output} -o ${sourceDirectory}${file.folder}/${file.output} --env production`,
              (err: ExecException) => {
                if (err) {
                  console.log(`err: ${err}`);
                }

                console.log(`${file.output} optimized`);
              },
          );
        },
    );
  });
});
