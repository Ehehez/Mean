var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    header: { type: String },
    body: { type: String },
    url: { type: String },
});

const Page = mongoose.model('Page', pageSchema)

module.exports = Page;