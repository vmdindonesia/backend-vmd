'use strict';

module.exports = function (Commentrevision) {
    let request = require('request');
    let app = require('../../server/server');

    /**
     * Create Comment revision TA
     */

    Commentrevision.remoteMethod(
        'createComment', {
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
                arg: 'createComment', type: 'array', root: true
            },
            http: {
                path: '/createComment',
                verb: 'post'
            }
        });

    Commentrevision.createComment = function (params, options, cb) {
        if (params.nim === 0) {
            var data = {
                'comment': params.comment,
                'idPengajuanta': params.idPengajuanta,
                'nim': '0',
                'nip': params.nip
            }
        } else {
            var data = {
                'comment': params.comment,
                'idPengajuanta': params.idPengajuanta,
                'nim': params.nim,
                'nip': '0'
            }
        }

        Commentrevision.create(data, function (error, data) {
            console.log(data);
            if (error) {
                cb(error);
                console.log(error.statusCode, 'Errornya')
            } else {
                cb(error, data);
            }
        });
    }
};
