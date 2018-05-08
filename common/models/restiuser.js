'use strict';

module.exports = function (Restiuser) {
    let request = require('request');
    let app = require('../../server/server');

    /**
     * Create Mahasiswa Logic
     */

    Restiuser.remoteMethod(
        'createMahasiswa', {
            accepts: [{
                arg: 'params',
                type: 'Object',
                required: true,
                http: { source: 'body' }
            }, {
                arg: "options",
                type: "object",
                http: "optionsFromRequest"
            }],
            returns: {
                arg: 'createMahasiswa', type: 'array', root: true
            },
            http: {
                path: '/createMahasiswa',
                verb: 'post'
            }
        });

    Restiuser.createMahasiswa = function (params, options, cb) {
        console.log(params, 'Params');
        Restiuser.create(params, function (error, data) {
            console.log(data);
            if (error) {
                cb(error);
                console.log(error.statusCode, 'Errornya')
            } else {
                let mahasiswa = app.models.Mahasiswa;
                const dataMahasiswa = {
                    'username': params.username,
                    'nim': params.nim,
                    'jurusan': params.jurusan
                }
                mahasiswa.create(dataMahasiswa, function (error, data) {
                    console.log(data);
                    if (error) {
                        cb(error);
                        console.log(error.statusCode, 'Errornya')
                    } else {
                        cb(error, data);
                    }
                });
            }
        });
    }

    /**
     * Create Dosen Logic
     */
    
    Restiuser.remoteMethod(
        'createDosen', {
            accepts: [{
                arg: 'params',
                type: 'Object',
                required: true,
                http: { source: 'body' }
            }, {
                arg: "options",
                type: "object",
                http: "optionsFromRequest"
            }],
            returns: {
                arg: 'createDosen', type: 'array', root: true
            },
            http: {
                path: '/createDosen',
                verb: 'post'
            }
        });

    Restiuser.createDosen = function (params, options, cb) {
        console.log(params, 'Params');
        Restiuser.create(params, function (error, data) {
            console.log(data);
            if (error) {
                cb(error);
                console.log(error.statusCode, 'Errornya')
            } else {
                let dosen = app.models.Dosen;
                const dataDosen = {
                    'username': params.username,
                    'nip': params.nip,
                    'status': params.status,
                    'jurusan': params.jurusan
                }
                dosen.create(dataDosen, function (error, data) {
                    console.log(data);
                    if (error) {
                        cb(error);
                        console.log(error.statusCode, 'Errornya')
                    } else {
                        cb(error, data);
                    }
                });
            }
        });
    }


};
