const base64 = require('file-base64');
module.exports = {
    encode: function (fullFilePath) {
        return new Promise((resolve, reject) => {
            if (!fullFilePath) {
                console.err('Se requiere una ruta de archivo para realizar la codificación a base64');
                reject({ message: 'Se requiere una ruta de archivo para realizar la codificación a base64' });
            }
            base64.encode(fullFilePath, function (err, base64String) {
                if (err) {
                    console.error('Se ha generado un error al intentar codificar a base64');
                    reject({ err: err, message: 'Se ha generado un error al intentar codificar a base64' })
                }
                if (base64String && base64String.length <= 0) {
                    console.log('La respuesta de la decodificación es vacía');
                    reject({ message: 'La respuesta de la decodificación es vacía' })
                }
                resolve(base64String);
            });
        });
    },
    decode: function (base64String, fullFilePath) {
        return new Promise((resolve, reject) => {
            base64.decode(base64String, 'NEW.EP72151_Fischer_The_Violin_Lesson.pdf', function (err, output) {
                console.log('success');
            });
        });
    },
};