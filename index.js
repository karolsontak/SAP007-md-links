const fs = require('fs');
const path = require('path');


function dirAndFile (dir, file) {
 
  if (!file)
  file = [];
  
  let readFile = fs.readdirSync (dir)
  console.log(readFile)
}

dirAndFile('/media/karol/Backup_Ubuntu/LABORATÓRIA/MD-LINKS/SAP007-md-links')

