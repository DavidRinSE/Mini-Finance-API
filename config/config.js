module.exports = {
    development: {
        url: 'postgres://postgres@db:5432/finance',
        dialect: 'postgres',
        logging: true
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
}