var mail = require('../../lib/').mail;
var path = require('path');



mail.create(
    {
        host: 'smtp.gmail.com',
        port: 587,
        requiresAuth: true,
        secureConnection: false,
        domains: ["gmail.com", "googlemail.com"],
        auth: {
            user: 'test@gmail.com',
            pass: 'Test'
        }
    }
);

console.log(mail);
console.log(path.resolve(path.join(__dirname, '/template.html')));

mail.send(
    { //Opciones de email
        to: 'to@gmail.com',
        subject: 'subject',
        from: '"Me" <noreply@example.com>',
    },
    path.resolve(path.join(__dirname, '/template.html')), //plantilla de mjml
    { //Datos a insertar en la plantilla
        token: 'El token',
        tokenLink: 'http://google.com'
    }
)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    ;