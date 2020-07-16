var express  = require('express');
var router   = express.Router();
var getConnection = require('../config/db');
var util     = require('../util');
var auth     = require('../logged');


// create 회원가입
router.post('/', function(req,res,next){
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    var nickName = req.body.nickName;
    var phone = req.body.phone;
    var address = req.body.address;
    var cardNum = req.body.cardNum;
    var validDate = req.body.validDate;//yymmdd
    var cardPw = req.body.cardPw;
    
    
    getConnection((conn)=>{
        var sql = "INSERT INTO mkit.user (userId,userPw,nickName,phone,address,cardNum,validDate,cardPw) VALUES (?,?,?,?,?,?,?,?)"
        conn.query(
            sql, // excute sql
            [userId, userPw, nickName,phone,address, cardNum,validDate,cardPw], // ? <- value
            function(err, result){
                if(err){
                    console.error(err);
                    res.json(util.successFalse(err));
                    throw err;
                }
                else {

                    res.json(util.successTrue(null,'회원가입성공'))
                }
        })
        conn.release();
    });
});


// 로그인한 유저정보 가져오기
router.get('/',auth,function(req,res,next){
   
    var userId=req.decoded.userId;
    
    getConnection((conn)=>{
        var sql = "SELECT * FROM user WHERE id=?"
        conn.query(
            sql, // excute sql
            [userId], // ? <- value
            function(err, result){
                if(err){
                    console.error(err);
                    res.json(util.successFalse(err));
                    throw err;
                }
                else {

                    res.json(util.successTrue(null,'유저 정보'))
                }
        })
        conn.release();
    });
});


module.exports = router;