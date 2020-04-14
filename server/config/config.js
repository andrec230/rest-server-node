//puerto
process.env.PORT = process.env.PORT || 3000

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// Data Base
let urlDB

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://andrec230:alCveqNxjPmb40qK@cluster0-4rrfs.mongodb.net/cafe'
}

process.env.URLDB = urlDB