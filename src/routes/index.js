const express= require('express');
const router= express.Router();

router.get('/',(req,res)=>{
    res.render('fetflix/index');
});

module.exports=router;