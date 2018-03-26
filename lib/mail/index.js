const nodemailer = require('nodemailer');
const mjmlUtils = require('mjml-utils');
const htmlToText = require('html-to-text');
const path = require('path'); // system
const fs = require('fs'); // system
let transporter;
module.exports = {
    /**
     * Create a transporter obj
     * 
     * https://nodemailer.com/smtp/
     * 
     * Example
     * {
     *      host:'smtp.gmail.com',
     *      port:587,
     *      requiresAuth: true,
     *      secureConnection: false,
     *      domains: ["gmail.com", "googlemail.com"],
     *      auth:{
     *          user:'mail@mail.com',
     *          pass:'testPassword'
     *      }
     *  }
     */
    create: function (config) {
        transporter = nodemailer.createTransport(config);
        return this;
    },

    /**
     * 
     */
    send: function (mailOptions, pathToHtmlEmailTemplate, templateData) {
        return new Promise((resolve, reject) => {
            if (!transporter)  return reject(Error('Favor de definir un transporter')); 
            if (!mailOptions) return reject(Error('Mailoptions es indefinido'));
            if (!pathToHtmlEmailTemplate && !path.isAbsolute(pathToHtmlEmailTemplate))  return reject(Error('no hay una ruta a una plantilla o la ruta no es absoluta'));
            fs.stat(pathToHtmlEmailTemplate, function (err, stat) {
                if (err) return reject(err) ;
                mjmlUtils.inject(pathToHtmlEmailTemplate, templateData)
                    .then(htmlTemplate => {
                        var textTemplate = htmlToText.fromString(htmlTemplate, { //Lento!
                            wordwrap: 130//Check docs
                        });
                        mailOptions.html = htmlTemplate;
                        mailOptions.text = textTemplate;
                        return resolve(transporter.sendMail(mailOptions));
                    });
            });


        });

    }
};