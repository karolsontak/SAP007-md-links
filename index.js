const fs = require('fs');
const path = require('path');

function filePath(file) {
  const encoding = "utf8";
  try {
    const text = fs.readFileSync(file, encoding);
    return findLinks(text);
  } catch (erro) {
    handleError(erro);
  } finally {
    console.log('Completed Operation');
  }
}
filePath(path.join(__dirname, '/src/text.md'))

function findLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const match = text.match(regex);
      if (match) {
        return match.map((str) => {
          const arrLink = str.replace('[', '').split('](');
          const strObject = {
            text: arrLink[0],
            link: arrLink[1],
          };
          console.log(strObject)
          return strObject;
        })
        
      } else {
        return null;
      }
    }

function handleError(erro) {
  console.log(handleError)
  throw new Error((erro.code, 'No files found'));
}

