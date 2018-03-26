const nodemailer = require('nodemailer');
const mjmlUtils = require('mjml-utils');
const htmlToText = require('html-to-text');
const path = require('path'); // system
const fs = require('fs'); // system
//let transporter = nodemailer.createTransport(sails.config.mail.connections.gmail);
let transporter;
module.exports = {
    /**
     * Create
     * 
     */
     create:function(config){
        transporter = nodemailer.createTransport(config);
        return this;
     },

    /**
     * 
     */
    send: function (mailOptions, pathToHtmlEmailTemplate, templateData,cb) {
        //const pathToHtmlEmailTemplate = path.join(__dirname, '../../assets/mjml/build/' + templateName + '.html');
        if(!transporter) {console.log('Favor de definir un transporter'); return 0;}
        console.log('transporter');
        console.log(transporter);
        if(!mailOptions) {console.log('Mailoptions es indefinido'); return 0;}
        console.log('mailOptions');
        console.log(mailOptions);
        if(!pathToHtmlEmailTemplate) {console.log('no hay una ruta a una plantilla'); return 0;}
        console.log('pathToHtmlEmailTemplate');
        console.log(pathToHtmlEmailTemplate);
        fs.stat(pathToHtmlEmailTemplate, function (err, stat) {
            if (err) return ;//cb(err);
            mjmlUtils.inject(pathToHtmlEmailTemplate, templateData)
                .then(htmlTemplate => {
                    var textTemplate = htmlToText.fromString(htmlTemplate, { //Lento!
                        wordwrap: 130//Check docs
                    });
                    mailOptions.from = '"My Name 🚑 " <noreply@example.com>';
                    mailOptions.html = htmlTemplate;
                    mailOptions.text = textTemplate;
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error)   console.log(err) ;
                        //return cb(null,info);
                         console.log(info);
                    });
                });
        });
    }
};