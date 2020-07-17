var express  = require('express');
var router   = express.Router();
var getConnection = require('../config/db');
var util     = require('../util');
var auth     = require('../logged');
const mysql = require('mysql');


// 주문내역보여주기
/*
router.get('/', function(req,res,next){
   
    
    
    getConnection((conn)=>{
        var sql = "SELECT * FROM category"
        conn.query(
            sql, // excute sql
            [], // ? <- value
            function(err, result){
                if(err){
                    console.error(err);
                    res.json(util.successFalse(err));
                    throw err;
                }
                else {
                    var categories=[]
                    result.forEach(function(element){
                        var category={
                            'id':element.categoryKey,
                            'category':element.name,
                            'img':element.img,

                        }
                        categories.push(category)
                        
                    });
                    res.json(util.successTrue(categories,'카테고리 목록'))
                }
        })
        conn.release();
    });
});
*/

// 주문데이터 추가하기
router.post('/',auth,function(req,res,next){
   
    var userId=req.decoded.userId;

    var itemList = JSON.parse(req.body.itemList);
  

    
       
    
    
    
    getConnection((conn)=>{
        var sql = "insert into orderlist values(null,(select userKey from user where userId=?),DATE_ADD(NOW(), INTERVAL 9 HOUR),DATE_ADD(DATE_ADD(NOW(), INTERVAL 9 HOUR), INTERVAL 1 DAY),default);"
       
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

                    var sql1="select orderlistKey from orderlist where orderDate=(select MAX(orderDate) from orderlist where userKey=(select userKey from user where userId=?))"
                    


                    conn.query(
                        sql1, // excute sql
                        [userId], // ? <- value
                        function(err1, result1){
                            if(err1){
                                console.error(err1);
                                res.json(util.successFalse(err1));
                                throw err1;
                            }
                            else {
                                
                                var sql2 = 'INSERT INTO itemlist SET ?; ';
                                var sql2s = "";
                                itemList.forEach(function(item){
                                    item.orderlistKey=result1[0].orderlistKey;
                                    sql2s += mysql.format(sql2, item);
                                });  
                                
                                conn.query(
                                    'SET SQL_SAFE_UPDATES=0; '+sql2s, // excute sql
                                    
                                    function(err2, result2){
                                        if(err2){
                                            console.error(err2);
                                            res.json(util.successFalse(err2));
                                            throw err2;
                                        }
                                        else {
                                            res.json(util.successTrue(null,'주문 성공'))
                                        }
                                    }
                                )
                                            


                                
                            }
                    })
                   
            
                }
        })

        
        conn.release();
    });
});


module.exports = router;

