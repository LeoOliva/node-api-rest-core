module.exports = {

     /**
     * Sube un archivo al sistema
     * 
     * Hace falta validar los formatos
     * 
     * REF: https://sailsjs.com/documentation/concepts/file-uploads
     */
    skipper: function (uploadFieldName,uploadConfig, req, res) {
        return new Promise((resolve, reject) => {
            // e.g.
            // 0 => infinite
            // 240000 => 4 minutes (240,000 miliseconds)
            // etc.
            //
            // Node defaults to 2 minutes.
            if(!uploadFieldName) console.info('No se ha especificado el campo de carga de archivos, se utilizará media por defecto');
            if(!uploadConfig){
                console.error('Se requiere una configuración de la carga');
                reject({message:'Se requiere una configuración de la carga'});
            }
            if(!req || !res){
                console.error('Se requiere una un objeto req y res');
                reject({message:'Se requiere una un objeto req y res'});
            }
            res.setTimeout(0);
            var upstreams = req.file( uploadFieldName | 'media');
            if (!upstreams._files[0]) {
                upstreams.upload({ noop: true });
                sails.log.warn('No se seleccióno recurso para cargar');
                reject('No se seleccióno recurso para cargar');
            }
            else { //Que se suba solo una imagen ?
                upstreams.upload(uploadConfig, function (err, uploadedFiles) {
                    if (err) {
                        sails.log.error('Se ha generado un error al intentar subir el recurso(s)');
                        reject({ message: 'error', err: err })
                    }
                    if (!uploadedFiles || uploadedFiles.length <= 0) {
                        sails.log.error('No se ha subido el recurso(s)');
                        reject({ message: 'No se ha subido el recurso(s)' });
                    } else {
                        sails.log.info('Se ha cargado ' +  uploadedFiles.length + ' archivo(s)');
                        sails.log.info(uploadedFiles);
                        resolve(uploadedFiles);
                    }
                });
            }

        });
    }
};