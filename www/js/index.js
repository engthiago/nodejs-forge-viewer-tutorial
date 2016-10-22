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

var defaultUrn = '<dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE2LTEwLTIyLTA5LTA3LTA1LXFoMmxremJteXkyMjh0Z25ydWJ4bjJoenowaGcvaW50cm8tdmlld2VyLnJ2dA>';
var savedToken = {};
var tokenurl = window.location.protocol + '//' + window.location.host + '/api/token';
var notificationChannel = '';

$(document).ready(function () {

    var config = {
        environment : 'AutodeskProduction'
    };

    // Instantiate viewer factory
    var viewerFactory = new Autodesk.ADN.Toolkit.Viewer.AdnViewerFactory(
        tokenurl,
        config);

    // Allows different urn to be passed as url parameter
    var paramUrn = Autodesk.Viewing.Private.getParameterByName('urn');
    var urn = (paramUrn !== '' ? paramUrn : defaultUrn);

    viewerFactory.getViewablePath (urn,
        function(pathInfoCollection) {
            var viewerConfig = {
                viewerType: 'GuiViewer3D'
                // viewerType: 'Viewer3D' // If a viewer without a toolbar is wanted
            };
            var viewer = viewerFactory.createViewer(
                $('#viewerDiv')[0],
                viewerConfig);
            viewer.load(pathInfoCollection.path3d[0].path);
        }, onError);

});

// I use this call if you want to get back an object json of your token

var tokenAjax = function(handleData) {
      $.ajax({
        url:tokenurl,
        dataType: 'json',  
        success:function(data) {
          handleData(data); 
        }
    });
}

function onError(error) {
    console.log('Error: ' + error);
};