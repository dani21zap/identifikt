module.exports = (err, req, res, next) => {
    // set locals, only providing error in development
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
		if(err.response && err.response.config) console.log(err.response.config);
    }

    let regex = new RegExp('^\/api\/');
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

     if (err.isJson) {
        return res.status(err.status).json(err.toJson());
    }
    if(regex.test(req.url)){
        let status = res.statusCode != 200 ? res.statusCode : 500;
        return res.status(status).json({
            message: err.message,
            statusCode: status,
        });
    }
    // render the error page
    res.status(err.status || 500);
    return res.render('error');

    // if (err.message.errors) {
    //     let message = {};
    //     for (let key in err.message.errors) {
    //         message[key] = err.message.errors[key].message;
    //     }
    //     err.message = message;
    // }
    // console.log(err.status)
    // if (err.response) {
    //     return res.status(err.response.status || 500).json(err.response.data);
    // }
    // // render the error page
    // res.status(err.status || 500);
    // if(regex.test(req.url)){
    //     return res.json({ message: err.message});
    // };
    // if (err.json) {
    //     return res.json({ errors: err.message });
    // }
}
