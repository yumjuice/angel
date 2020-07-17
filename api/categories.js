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
                            'category':element.cName,
                            'img':element.cImg,

                        }
                        categories.push(category)
                        
                    });
                    res.json(util.successTrue(categories,'카테고리 목록'))
                }
        })
        conn.release();
    });
});

router.get('/:id', function(req,res,next){
   
    var categoryKey=req.params.id;
    
    getConnection((conn)=>{
        var sql = "SELECT * FROM company AS C INNER JOIN category AS A ON C.categoryKey=A.categoryKey WHERE C.categoryKey=?"
        conn.query(
            sql, // excute sql
            [categoryKey], // ? <- value
            function(err, result){
                if(err){
                    console.error(err);
                    res.json(util.successFalse(err));
                    throw err;
                }
                else {
                    var restaurants=[]
                    result.forEach(function(element){
                        var restaurant={
                            'id':element.companyKey,
                            'name':element.name,
                            'phone':element.phone,
                            'address':element.address,
                            'img':element.img,
                            'description':element.description,
                            'category':element.categoryKey

                        }
                        restaurants.push(restaurant)
                        
                    });
                    
                    var data={
                        'category':result[0].cName,
                        'categoryImg':result[0].cImg,
                        'restaurants':restaurants
                    }
                    res.json(util.successTrue(data,'카테고리별 식당 리스트'))
                }
        })
        conn.release();
    });
});




module.exports = router;