//puerto
process.env.PORT = process.env.PORT || 3000

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// Data Base
let urlDB

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'Here your url colud mongo connection'
}

process.env.URLDB = urlDB