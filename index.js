const fs = require('fs');
const path = require('path');

const dirPath = fs.readdirSync(__dirname);
dirPath.forEach(file => {
  if (path.extname(file) === ".md")
console.log(file)
})

// function dirPath(file) {
//   const absolutePath = path.join(__dirname, '.', file);
//   const encoding = "utf8";
//   try {
//     const files = fs.readdir(absolutePath, { encoding });
//     const result = files.map((file) => {
//       const local = `${absolutePath}/${file}`;
//       const text = fs.readFileSync(local, encoding);
//     return findLinks(text);
//   })
//   return result;
//   } catch (erro) {
//     handleError(erro);
//   } finally {
//     console.log('Completed Operation');
//   }

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

