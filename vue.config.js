const path = require('path')
module.exports = {
    configureWebpack: {
        name: 'a',
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        }
    },
}