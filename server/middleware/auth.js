const { User } = require('../models/User')

let auth = (req, res, next) => {
    // 인증 처리(페이지 사용 가능 여부 등)
    // 1. 클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.auth;

    // 2. 토큰을 복호화하여 User 찾기
    // 3. User 있으면 인증O, 없으면 인증X
    User.findByToken(token, (err, user) => {
        if(err) throw err ;
        if(!user) return res.json({isAuth : false, error: true})

        req.token = token;
        req.user = user;

        next() // 미들웨어 다음으로 진행할 수 있게끔 진행..
    })

    

}

module.exports = { auth }