// Привет, я Байден, разработка @dalechenkoivan

// Помести меня в папку с картинками, я соберу все картинки которые со мной 
// в одной папке в один файл images.json, они будут подписаны своими именами без расширений

// Ниже пример того что вы получите в файле на выходе
// { "ballWithFinger": "data:image/svg;base64,PHN2ZyB3aWR0aD0iNDA4IiBoZWlnaHQ9IjQ0NCIgdm..." }

// Я умею работать с png, svg, jpg и gif

// Просто помести меня в папку с картинками и выполни node biden.js

// Потом импортируй полученный файл в свой рабочий файл
// import images from './images.json';

// Потом задай нужному элементу нужную картинку
// document.getElementById('wh1').src = images.light



import fs from 'fs';
import util from 'util';

// Преобразование readFile и writeFile в промисы
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);

(async () => {
    const currentDirectory = process.cwd();
    const files = await readdir(currentDirectory);
    const imageNamesLong = files.filter(file => file !== 'biden.js' && file !== 'images.json');

    let endFile = '{';
    for (let i = 0; i < imageNamesLong.length; i++) {
        const filenameFull = imageNamesLong[i];
        const parts = filenameFull.split(".");
        // Ошибка: Вы получаете расширение файла дважды. Должно быть так:
        const filename = parts[0];
        const extension = parts[parts.length - 1];

        const data = await readFile(imageNamesLong[i]);
        const base64String = data.toString('base64');

        if (i != 0) {
            endFile = `${endFile},`;
        }

        endFile = `${endFile}"${filename}":"data:image/${extension == 'svg' ? 'svg+xml' : extension};base64,${base64String}"`;
    }
    endFile = `${endFile}}`;

    await writeFile('images.json', endFile);
})();