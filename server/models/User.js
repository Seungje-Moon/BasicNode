const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// JSONWEBTOKEN IMPORT
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1   // 똑같은 이메일은 쓰지 못하게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {    // 유효성 관리
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const saltRounds = 10;

// req에 저장하기 전에 작업함
userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {// 패스워드가 변화했을 때 동작
        console.log("password changed..")
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err)
                return next(err) // salt 생성 실패

            // salt 생성 성공
            bcrypt.hash(user.password, salt, function(err, hash) { // hash에 암호화된 암호가 있음
                if(err)
                    return next(err)
                
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})  

userSchema.methods.comparePassword = function(plainPw, func) {
    bcrypt.compare(plainPw, this.password, function(err, isMatch) { // plain password를 암호화 처리 후 둘을 비교
        if(err) {
            return func(err)
        }

        func(null, isMatch) // isMatch는 true
    })
}

userSchema.methods.generateToken = function(func) {

    var user = this;

    // Jsonwebtoken을 이용해서 token 생성
    // -> 'secretToken'과 user._id를 이용하여 토큰을 생성함
    // -> 나중에 'secretToken'을 통해서 해당 유저가 누구인지 알 수 있음
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save((err, user) => {
        if(err) {
            return func(err)
        }

        func(null, user)
    })
}

userSchema.statics.findByToken = function(token, func) {
    var user = this;

    // 가져온 토큰을 Decode한다
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 ID를 찾았으면, 요청 값과 DB값이 일치하는지 확인
        user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
            if(err) return func(err)

            func(null, user)
        })

    })
}

const User = mongoose.model('User', userSchema) // 모델이름, 스키마
module.exports = { User } // 다른 곳에서도 사용 가능