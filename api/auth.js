var express  = require('express');
var router   = express.Router();
var getConnection = require('../config/db');
var jwt      = require('jsonwebtoken');
var util     = require('../util');


// 로그인
router.post('/', function(req,res,next){
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    
    
    
    getConnection((conn)=>{
        var sql = "SELECT * FROM user where userId=?";
        conn.query(
            sql, // excute sql
            [userId], // ? <- value
            function(err, result){
                if(err){
                    console.error(err);
                    res.json(util.successFalse(err));//dberror
                    throw err;
                }
                else {
                    console.log(result);
                    if(result.length == 0){
                        res.json(util.successFalse(null,'해당 아이디가 존재하지 않습니다.'))//아이디없음
                    }
                    else {
                        var dbPassword = result[0].userPw;
                        if(dbPassword == userPw){
                            var tokenKey = "secretKey"
                            jwt.sign(
                            {
                                userId : result[0].userId,
                                nickName : result[0].nickName
                            },
                            tokenKey,
                            {
                                expiresIn : '10d',
                                issuer : 'mkit.admin',
                                subject : 'user.login.info'
                            },
                            function(err, token){
                                console.log('로그인 성공', token)
                                var jwtToken={
                                    'token': token
                                }
                                res.json(util.successTrue(jwtToken,'로그인 성공'))
                            }
                            )            
                        }
                        else {

                            res.json(util.successFalse(null,'비밀번호가 틀렸습니다.'));//비밀번호 틀림
                        }
                    }
                }
        })
        conn.release();
    });
});

module.exports = router;