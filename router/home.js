const express=require('express');
const employee=require('../models/club');
const router=express.Router();


router.get('/',(req,res,next)=>{
    employee.find((err,docs)=>{
        res.render('home',{employee:docs});

    }).catch((err)=>{
        console.log("something wrong");
    })
})

router.post('/add',(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const mobile=req.body.mobile;
    console.log(name,email,mobile);
    const emp=new employee({
        name,
        email,
        mobile
    });
    emp.save((err)=>{
        if(err){
            console.log('not save'+err);
        }else{
            console.log('saved data');
res.redirect('/');
        }
    })
})

router.get('/edit/:id',(req,res,next)=>{
    console.log(req.params.id);
    employee.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,doc)=>{
        if(err){
            console.log("not updated");
        }
        else{
            res.render('edit',{employees:doc});

        }
    })
})

router.post('/edit/:id',(req,res,next)=>{
 employee.findByIdAndUpdate({_id:req.params.id},req.body,(err,doc)=>{
     if(err){
         console.log('not updataed');
     }
     else{
         res.redirect('/');
     }
 })
})
router.get('/delete/:id',(req,res,next)=>{
    employee.findByIdAndDelete({_id:req.params.id},(err,doc)=>{
        if(err){
            console.log('not deleted');
        }
        else{
            console.log('deleted succes');
            res.redirect('/');
        }
    })
})
module.exports=router;