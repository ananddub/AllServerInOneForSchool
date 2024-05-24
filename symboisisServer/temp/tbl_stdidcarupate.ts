import * as fs from 'fs';
import * as path from 'path';
import { sqlQueryUpdate } from '../src/services/sqlfunctoin';
const uploadFolder = '/home/anand/Document/Server/symboisisServer/uploads/std';
// const uploadFolder = '/home/ubuntu/AllServerInOneForSchool/symboisisServer/uploads/std';
process.chdir(uploadFolder);
console.log(process.cwd())
fs.readdir('.', async (err, files) => {
    if (err) {
        console.error('Error reading upload folder:', err);
        return;
    }

    const imageFiles = files.map(file => {
        const filename= file.slice(0,file.indexOf('.'))
        const ext = path.extname(file).toLowerCase();
        if(ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif')return filename
        return ''
    }).filter(file => file !== '');
    for (let admno of imageFiles) {
        const query = `update  tbl_stdidcard set imgstatus=${1} where admno="${admno}" `
        await sqlQueryUpdate(query)
    }
    console.log(`Total images: ${imageFiles.length}`);
    console.log('Image files:', imageFiles);
});
