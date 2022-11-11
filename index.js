const express = require('express') // express 모듈 로드
const app = express() // express 앱을 생성
const port = 5000

const { User } = require("./models/User")
const bodyParser = require('body-parser')

// application/x-www-form-urlencoded : 클라이언트에서 전송한 정보를 서버에서 분석 가능
app.use(bodyParser.urlencoded({extended:true}))

// application/json : client에서 전송한 json 형식 데이터를 서버에서 분석 가능
app.use(bodyParser.json())

const config = require("./config/key")

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => { res.send('Hello World! 받으세요~') })

app.post('/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => { // req.body내의 정보들이 몽고 모델에 저장됨
    if(err)
      return res.json({success : false, err}) // 클라이언트에 성공하지 못했다고 전달

    return res.status(200).json({success: true})
  }) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})