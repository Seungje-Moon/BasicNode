const express = require('express') // express 모듈 로드
const app = express() // express 앱을 생성
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://moon:1234@boilerplate.z24cpa4.mongodb.net/?retryWrites=true&w=majority', {})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => { res.send('Hello World!') })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})