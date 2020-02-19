var PageModel = require("../models/page.model")


exports.postPage = async (body, id) => {
    try {
        const page = new PageModel(body)
        await page.save()
        return page;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.getPageCookies = async () => {
    try {
        let ret = await PageModel.findOne({ url: '/cookies' }, function (err, posts) {
        }
        )
        return ret;
    }
    catch (error) {
        throw Error(error.message)
    }
}


exports.getPageWarning = async () => {
    try {
        let ret = await PageModel.findOne({ url: '/warning' }, function (err, page) {
        })
        return ret;
    }
    catch (error) {
        throw Error(error.message);
    }
}