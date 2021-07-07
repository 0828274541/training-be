const { MESSAGES } = require('../../constant/index');

module.exports = function (req, res, next) {
    const resources = req.baseUrl + req.route.path;

    global.acl.areAnyRolesAllowed(req._user.role[0], resources, req.method.toLowerCase(), function (err, isAllowed) {
      //  console.log(err, isAllowed);
        if (!isAllowed || err) return res.json({
            code: 403,
            message: MESSAGES.USERNAME_NOT_PERMISSION,
            data: null
        })
        next();
    });
}
