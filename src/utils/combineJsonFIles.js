/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const jsonDirectory = 'src/api/phones/';

const combinedData = [];
fs.readdirSync(jsonDirectory).forEach((file) => {
  if (path.extname(file) === '.json') {
    const filePath = path.join(jsonDirectory, file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    combinedData.push(jsonData);
  }
});

const combinedJSON = combinedData;

const combinedJSONString = JSON.stringify(combinedJSON, null, 2);

const outputFilePath = './combined_data.json';
fs.writeFileSync(outputFilePath, combinedJSONString, 'utf8');

console.log('Combined JSON data written to', outputFilePath);
