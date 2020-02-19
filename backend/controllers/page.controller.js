var mongoose = require('mongoose');
var PageModel = mongoose.model('Page');
var PageService = require('../services/page.service');

exports.postPage = async (req, res) => {

    let page = await PageService.postPage(req.body);

    res.send(page);

}

exports.getPageCookies = async (req, res) => {


    let page = await PageService.getPageCookies();

    res.send(page);
}


exports.getPageWarning = async (req, res) => {

    let page = await PageService.getPageWarning();

    res.send(page);
}