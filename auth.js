const isLogin = (req, res, next)=>{
    try {
        if(req.session.user_id){
            next()
        }
        else{
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports={ isLogin }