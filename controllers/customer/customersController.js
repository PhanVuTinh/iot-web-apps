var express = require('express');
var service = require('../../services/service');
var config = require('../../config/config.json');
var cusController = express.Router();
var http = require ('http');
var request = require('request');
var passport = require('passport');
var moment = require('moment');
var check = require('express-validator');

 // customersController.get('/',function(req,res){
 // res.render('userLayout', { title: 'Trang chá»§'});
 // });
//customersController.get('/themphanhoi', function(req, res) {
//	console.log(req.session);
//	res.render('users/sendFeedback', { title: 'ThÃªm pháº£n há»“i'});
//});
cusController.get('/themphanhoi', function(req, res) {
	console.log(req.session);
	token = "JWT " + req.session.token;
	res.render(
		'users/sendFeedback', 
		{
			title:'Thêm phản hồi',
			token:token
		}
	);
});

cusController.post('/themphanhoi',function(req,res){
	console.log('post themphanhoi');
	var token = "" ;
	var body ={
		feedback_name : req.body.feedback_name,
		feedback_email : req.body.feedback_email,
		feedback_message :req.body.feedback_message,
		feedback_status : req.body.feedback_status,
		
	}; 

	console.log(body); 
	var id = req.params.id; 
	var options = service.setOption('post',config.urladdress + '/api/feedback/sendfeedback' ,{'Authorization':token,'Content-Type': 'application/x-www-form-urlencoded'},body);
	
	service.post(options,function(error,data){
		if(error){
			return error;
		}else{ 
			res.redirect('/trangchu/themphanhoi');
		} 
	});
})
cusController.get('/gioithieu', function(req, res) {
	res.render(
		'users/Introduce', 
		{ 
			title: 'Giới thiệu',
			secu: config.securitycode,
			conf: config.urladdress,
			token: req.session.token,
			userid: req.session.userid,
			username: req.session.username,
			fullName: req.session.fullName
		}
	);
});
cusController.get('/baiviet', function(req, res) {
	res.render('users/Post',
		{ 
			title: 'Bài viết',
			secu: config.securitycode,
			conf: config.urladdress,
			token: req.session.token,
			userid: req.session.userid,
			username: req.session.username,
			fullName: req.session.fullName
		}
	);
});

cusController.get('/sanpham', function(req, res) {
	var token = "JWT " + req.session.token;
	res.render(
		'users/Product', 
		{ 
			title: 'Sản phẩm',
			secu:config.securitycode,
			conf:config.urladdress,
			token:req.session.token,
			userid: req.session.userid,
			username:req.session.username,
			fullName:req.session.fullName
		}
	);
	console.log(token);
});

cusController.get('/chitietbaiviet/:id',function(req,res){
	//var token = "JWT " + req.session.token;
	var token ="";
	var id = req.params.id; 
	var options = service.setOption('GET', 'http://103.221.220.184:3000/api/post/getbyid/' + id,{'Authorization':token});
	service.get(options,function(error,data){
		if(error){
			return error;
		}else{
			data = JSON.parse(data);
			userData = data.data;
			console.log(userData);
			res.render(
				"users/PostDetail", 
				{
					title: 'Chi tiáº¿t bÃ i viáº¿t ',
					moment:moment,
					users:userData,
					secu:config.securitycode,
					conf:config.urladdress,
					token:req.session.token,
					userid:req.session.userid,
					username:req.session.username,
					fullName:req.session.fullName
				}
			);
		} 
	});
});

cusController.post('/thembinhluan/:id',function(req,res){
	console.log('Vao trong ruot thembinhluan');
	var token = "JWT " + req.session.token;
	var body ={
		comment_commentByName : req.body.comment_commentByName,
		post_id : req.body.post_id,
		comment_content : req.body.comment_content,
		comment_commentByEmail :req.body.comment_commentByEmail
	}; 

	//console.log(body); 
	var id = req.params.id; 
	var options = service.setOption('POST',config.urladdress + '/api/comment/create' ,{'Authorization':token,'Content-Type': 'application/x-www-form-urlencoded'},body);
	service.post(options,function(error,data){
		if(error){
			return error;
		}else{ 
			var post = req.body.post_id;
			res.redirect('/tintuc/chitietbaiviet/'+post);
			
		} 
	});
});
// service.ensureAuthenticated
cusController.post('/themsanpham',function(req,res){
		// console.log('Vao trong ruot post themsanpham');
	
		var token = "JWT " + req.session.token;
		// var token = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImlkIjoiVGVhbVRvbTE3In0sImV4cCI6MTUwODc1NTI0NzE5M30.XHfKeXGIkM1Wr39c4PHdAF9Cc-DP2IRXvRGO3jnqolg';
		contents ='';
		contents += 'Vụ nuôi : '+ req.body.stocking_id+'\n';
		contents += 'Đợt thu hoạch : '+ req.body.harvest_id+'\n';
		contents += 'Chi tiết :'+req.body.post_content+'\n';
		contents += 'Liên Hệ : '+req.body.post_description;

		var body ={
			postcate_id : 27,
			user_id : req.session.userid,
			post_title : req.body.post_title,
			post_content : contents,
			post_createBy : req.session.username,
			post_isDelete :false,
			post_isPublic: true,
			

		}; 
		// console.log(body); 
		 console.log(token);
	
		var options = service.setOption('POST','http://localhost:3000/api/post/create' ,{'Authorization':token,'Content-Type': 'application/x-www-form-urlencoded'},body);
		service.post(options,function(error,data){
			if(error){
				return error;
			}else{ 
				
				res.redirect('/sanpham');
				
			} 
		});
		
		// res.send('post them san pham'+ ' data: '+ JSON.stringify(body));
		// console.log('Vao trong ruot post themsanpham');
	}
);


cusController.post('/themtraloi/:id',function(req,res){
	console.log('Vao trong ruot');
	var token = "JWT " + req.session.token;
	var body ={
		anscom_answreByName : req.body.anscom_answreByName,
		comment_id : req.body.comment_id,
		anscom_content : req.body.anscom_content,
		anscom_answerByEmail :req.body.anscom_answerByEmail
	}; 

	console.log(body); 
	var id = req.params.id; 
	var options = service.setOption('post',config.urladdress + '/api/answercomment/create' ,{'Authorization':token,'Content-Type': 'application/x-www-form-urlencoded'},body);
	service.post(options,function(error,data){
		if(error){
			return error;
		}else{ 
			var post = req.body.post_id;
			res.redirect('/tintuc/chitietbaiviet/'+post);
			
		} 
	});
})

module.exports = cusController;