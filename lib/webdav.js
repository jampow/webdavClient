"use strict";

class Webdav {
    constructor(auth) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

        this.https = require('https')

        this.auth = `${auth.username}:${auth.password}`
    }

    setAuth(user, pass) {
        this.auth = `${user}:${pass}`
    }

    requestParams(type) {
        let params = {
            methd: 'GET',
            auth: this.auth,
            port: 443
        }

        switch(type) {
            case 'list':
                params.method = 'PROPFIND'
                params.headers = { Depth: 1 }
                break;
            case 'type':
                params.method = 'PROPFIND'
                params.headers = { Depth: 0 }
                break;
        }

        return params
    }

    request(host, url) {

        return new Promise((resolve, reject) => {

            const request = this.https.request(opts, (resp) => {

                let st = resp.statusCode

                if(st < 200 || st > 299) return

                const body = []

                resp.on('data', (chunk) => body.push(chunk))

                resp.on('end', () => resolve(body.join('')))
            })

            request.on('error', (err) => reject(err))

            request.end()
        })
    }
}

module.exports = new Webdav()

//var wd = new Webdav({
    //username: 'gsoares',
    //password: ''
//})

//wd.multRequest('noticias.uol.com.br/index.htm')
    //.then((data) => console.log('noticias'))
    //.catch((err) => console.log('erro', err))

//wd.multRequest('commons.uol.com.br/static/v2/init.vm')
    //.then((data) => console.log('commons'))
    //.catch((err) => console.log('erro', err))
