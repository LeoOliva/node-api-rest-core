var res = require('../../lib/').reponse;

console.log('------------------------');
console.log('res.getStatus(200)');
console.log(res.getStatusText(200));
console.log('res.getStatus(404)');
console.log(res.getStatusText(404));
console.log('res.getStatus(2000)');
console.log(res.getStatusText(2000));
console.log('------------------------');
console.log(res.format(
    { //Información relativa a la petición

    },
    200, // HTTP estatus
    { //Informacón principal
        name: 'will',
        lastaname: 'smith'
    },
    { //Información Extra
        extra: 'info'
    }
));
console.log('------------------------');
console.log('------------------------');
console.log(res.format(
    { //Información relativa a la petición

    },
    200, // HTTP estatus
    [
        { //Informacón principal
            name: 'will',
            lastaname: 'smith'
        },
        { //Informacón principal
            name: 'will',
            lastaname: 'smith'
        },
        { //Informacón principal
            name: 'will',
            lastaname: 'smith'
        }
    ],
    { //Información Extra
        extra: 'info'
    }
));
console.log('------------------------');
console.log(res.format(
    { //Información relativa a la petición
        method: 'post',
        apiVersion: '1.0.2'
    },
    404, //HTTP Estatus
    { //Informacón principal
        name: 'will',
        lastaname: 'smith'
    },
    { //Información Extra
        extra: 'info'
    }
));
console.log('------------------------');
console.log('------------------------');
console.log(res.format(
    { //Información relativa a la petición
        method: 'post',
        apiVersion: '1.0.2'
    },
    404, //HTTP Estatus
    [
        { //Informacón principal
            name: 'will',
            lastaname: 'smith'
        },
        { //Informacón principal
            name: 'will 2',
            lastaname: 'smith 2'
        },
        { //Informacón principal
            name: 'will 3',
            lastaname: 'smith 3'
        }
    ],
    { //Información Extra
        extra: 'info'
    }
));
console.log('------------------------');