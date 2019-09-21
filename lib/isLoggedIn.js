module.exports = function (req, res, next) {
    if(req.session.EmailID === undefined){
        return res.redirect('/');
    }else{
        next();
    }

};