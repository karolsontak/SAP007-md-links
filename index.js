const fs = require('fs');
const path = require('path');

function findFiles(dir, files) {
    const directory = fs.readdirSync(dir);
    return directory.reduce((getFiles, file) => {
        const getDir = path.join(dir, file);
        if (fs.statSync(getDir).isDirectory()) {
            findFiles(getDir, getFiles);
        } else if ((path.extname(file) === ".md")) {
            getFiles.push(getDir);
        }
        return getFiles;
    }, files || [])
}

module.exports = findFiles;

const mdLinks = (directory) => {
  return new Promise((resolve, reject) => {
    const regex = /(\[.[^[\]]*\])(\([^#][^)]+)/gm;
    const findedFiles = findFiles(directory, []);
    if (findedFiles.length === 0) {
      reject("Nenhum arquivo foi encontrado")
    }
    const results = findedFiles.map(fileMD => {
      const file = fs.readFileSync(fileMD, 'utf8')
      const match = file.match(regex);
      if (match) {
        return match.map((str) => {
          const arrLink = str.replace('[', '').split('](');
          const strObject = {
            text: arrLink[0],
            link: arrLink[1],
            file: fileMD,
          };
          return strObject;
        })
      } else {
        return null;
      }
    },
    )
    resolve(results)
  })
}

module.exports = mdLinks;