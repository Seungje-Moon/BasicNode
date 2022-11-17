const express = require('express') // express 모듈 로드
const app = express() // express 앱 생성


const { User } = require("./models/User")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { auth } = require('./middleware/auth')

// application/x-www-form-urlencoded : 클라이언트에서 전송한 정보를 서버에서 분석 가능
app.use(bodyParser.urlencoded({extended:true}))

// application/json : client에서 전송한 json 형식 데이터를 서버에서 분석 가능
app.use(bodyParser.json())

app.use(cookieParser())

const config = require("./config/key")

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => { res.send('Hello World! 받으세요~') })

// 회원 등록
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => { // req.body내의 정보들이 몽고 모델에 저장됨
    if(err)
      return res.json({success : false, err}) // 클라이언트에 성공하지 못했다고 전달

    return res.status(200).json({success: true}) // 클라이언트에 userInfo와 성공 정보 전달
  }) 
})

// 로그인
app.post('/api/users/login', (req, res) => {
  
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if(!userInfo) { // 요청 메일이 DB에 없으면
      return res.json( {
        loginSuccess : false,
        message : "일치하는 이메일이 없습니다."
      })
    }

    // DB에 일치하는 메일이 있으면 암호가 일치하는지
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다."
        })
      }

      // 일치한다면 토큰 생성
      userInfo.generateToken((err, userInfo) => {
        if(err) {
          return res.status(400).send(err);
        }

        // 받아온 토큰을 관리할 곳에 저장한다. 여기에서는 쿠키에..
        res.cookie("auth", userInfo.token)
          .status(200)
          .json({ loginSUccess: true, userId: userInfo._id})
      })
    }) 
  })
})

// auth는 사용자로부터 요청받고, callback function하기 전에 뭔가(미들웨어)를 해줌
app.get('/api/users/auth', auth, (req, res) => {
  // 미들웨어(auth)까지 통과했다면 인증 통과
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role == 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })

})

app.get('/api/users/logout', auth, (req, res) => {
  // 로그아웃 유저를 DB에서 찾아서 토큰 삭제
  User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => { // 데이터 찾아서 업데이트시킴
    if(err) return res.json({success: false, err})

    return res.status(200).send({success:true})
  })
})

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요 ~")
})

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})