'use strict';

module.exports = function (Pengajuanta) {
    let request = require('request');
    let app = require('../../server/server');

    /**
     * Create Pengajuan TA
     */

    Pengajuanta.remoteMethod(
        'createPengajuanTA', {
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
                arg: 'createPengajuanTA', type: 'array', root: true
            },
            http: {
                path: '/createPengajuanTA',
                verb: 'post'
            }
        });

    Pengajuanta.createPengajuanTA = function (params, options, cb) {
        console.log(params, 'Params');
        Pengajuanta.create(params, function (error, data) {
            console.log(data);
            if (error) {
                cb(error);
                console.log(error.statusCode, 'Errornya')
            } else {
                cb(error, data);
            }
        });
    }

    // Approve Pengajuan TA
    Pengajuanta.remoteMethod(
        'approvePengajuanTA', {
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
                arg: 'approvePengajuanTA', type: 'array', root: true
            },
            http: {
                path: '/approvePengajuanTA',
                verb: 'post'
            }
        });

    Pengajuanta.approvePengajuanTA = function (params, options, cb) {
        console.log(params, 'Params');
        Pengajuanta.updateAll({ id: params.id }, { statusPengajuan: params.statusPengajuan }, function (error, data) {
            console.log(data);
            if (error) {
                cb(error);
                console.log(error.statusCode, 'Errornya')
            } else {
                let commentRevision = app.models.CommentRevision;
                const data = {
                     'idPengajuanta' : '1',
                     'nip' : '123456',
                     'nim' : '201383069',
                     'comment' : 'bool kuda'
                }
                
                commentRevision.create(data, function (error, data) {
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
