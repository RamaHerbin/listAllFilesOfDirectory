const fs = require('fs');
const path = require('path');

const PATH_TARGET = '/Users/ramaherbin/Documents/dev/Fleur_de_Papier/SCIENCE-ACTION-NORMANDIE/SAN-DeReveEnReve/app';
const PATH_MODE = 'relative'

function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}
let paths = []
for (const filePath of walkSync(PATH_TARGET)) {
    if (PATH_MODE === 'relative') {
        let path = filePath.replace(PATH_TARGET, '.')
        paths.push(path);
    } else {
        console.log(filePath);
    }
}
// console.log('paths :>> ', paths);

fs.writeFile('output.json', JSON.stringify(paths, null, "\t"), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

