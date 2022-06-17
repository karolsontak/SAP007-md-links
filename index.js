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

