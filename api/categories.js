var express  = require('express');
var router   = express.Router();
var getConnection = require('../config/db');
var util     = require('../util');


// 카테고리 목록 보여주기
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





module.exports = router;