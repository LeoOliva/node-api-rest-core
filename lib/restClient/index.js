/**
 * 
 * 
 * 
 */
module.exports = {
    /**
     * Manejo general de peticiones
     *   
     * Para el manejo de peticiones genericas
     * La URL es especificada desde el controllador
     * 
     *  var rc = require('axios').create({
     *      baseURL: 'http://some.api.server.example'
     *  });
     * 
     *  
     *  
     *  Como utilizar la función request
     *  function genericEntryPoint (data) {
     *      return this.request(data, rc); //Retorna un apromesa
     *  }
     * 
     *  data : Array -> ejemplo { url: '/endpoint1', method:'get', headers:{...} }
     */
    request: function (data, rc) {
        return new Promise((resolve, reject) => {
            if (!data || !data.url) reject(Error('Favor de pasar un data valido'));
            data.headers && (rc.defaults.headers.common = data.headers);//Mandamos todos los headers de la petición
            resolve(rc[data.method || 'get'](data.url, data.params));
        });
    },
};