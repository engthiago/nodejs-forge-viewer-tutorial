/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var request = require('request');
var router = express.Router();

var credentials = (require ('fs').existsSync (__dirname + '/../credentials.js') ?
    require (__dirname + '/../credentials')
    : (console.log ('No credentials.js file present, assuming using CONSUMERKEY & CONSUMERSECRET system variables.'), 
    require (__dirname + '/../credentials_'))) ;

router.get ('/token', function (req, res) {
    request.post (
        credentials.Authentication,
        { form: credentials.credentials },
        function (error, response, body) {
            if ( !error && response.statusCode == 200 )
                res.send (body) ;
        }) ;
}) ;

module.exports = router;