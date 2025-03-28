const mongodb = require('./connect');

const getCollection = (name) => {
    return mongodb.getDatabase().db().collection(name);
};

module.exports = {
    getCollection,
};