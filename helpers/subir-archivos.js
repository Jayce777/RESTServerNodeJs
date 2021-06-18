const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extimagenes = ['jpg', 'png', 'jpeg', 'gif'];


const SubirArchivo = (files, extensionesPermitidas = extimagenes, carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const arrarchivo = archivo.name.split('.');
        const extension = arrarchivo[arrarchivo.length - 1];


        if (!extensionesPermitidas.includes(extension)) {

           return reject(`Archivo con extensión ${extension} no permitido`);
           
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {

            if (err) {
                return reject(err);
            }

            resolve(nombreTemp)
           
        });


    });


}


module.exports = {
    SubirArchivo
}