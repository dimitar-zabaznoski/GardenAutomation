// see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes


module.exports = Object.freeze({



    // success
    ok:      200,
    created: 201,

    // client error
    client:       400,
    unauthorized: 401,
    forbidden:    403,
    notFound:     404,
    conflict:     409,
    semantic:     422,

    // server error
    server:      500,
    noimpl:      501,
    unavailable: 503,


});




