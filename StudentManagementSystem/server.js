//express_demo.js �ļ�
var express = require('express');
var fs = require('fs');
var url = require('url');
var app = express();
var bodyParser = require('body-parser');

/*
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/web/" + "shinocreation.html" );
})
*/
/*
app.get('/web/*', function (req, res) {
	res.setHeader('Content-Type','text/javascript;charset=UTF-8');
	var pathname = url.parse(req.url).pathname;
   
   // ���������ļ���
   console.log("Request for " + pathname + " received."  +__dirname+pathname.substr(0));
   
   // ���ļ�ϵͳ�ж�ȡ������ļ�����
   fs.readFile(__dirname+pathname.substr(0), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP ״̬��: 404 : NOT FOUND
         // Content Type: text/plain
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP ״̬��: 200 : OK
         // Content Type: text/plain
         res.writeHead(200, {'Content-Type': 'text/html'});	
         //res.setHeader('Content-Type','text/javascript;charset=UTF-8');
         // ��Ӧ�ļ�����
         res.write(data.toString());		
      }
      //  ������Ӧ����
      res.end();
   }); 
	
   
})
*/
app.use(express.static(__dirname+"/web"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// mongoose ����
var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/shinocreation'); 
// ���Ӵ���
db.on('error', function(error) {
    console.log(error);
});
// Schema �ṹ
var classSchema = new mongoose.Schema({
		classDate:{type : Date, default: Date.now},
		duringHour:{type : Number},
		timePeriod:{type : String, default : 'E'},
		from:{type : String},
		to:{type : String},
		remark:{type : String, default : '��ױ�γ�'}
	}
);
var studentSchema = new mongoose.Schema({
		fullName:{type : String, default : '�����û�'},
		weixinName:{type : String},
		courseType:{type : String, default : 'c'},
		expectEndDate:{type : Date, default: Date.now},
		constellation:{type : Number, default : 0},
		practicalSessions:[{
				practicalname:{type : String, default : 'ʵϰ'},
				practicaldate:{type : Date, default: Date.now},
				remark:{type : String}}
		],
	  class:[classSchema],
		extraDeal:[{
		  		dealDate:{type : Date, default: Date.now},
					goods:{type : String},
					cost:{type : Number, default : 0}, 
					amount:{type : Number, default : 0}, 
					status:{type : String, default : 'd'},
					remark:{type : String}}
				],			
		totalCourseAmount:{type : Number, default : 50}, 
		completeCourseAmount:{type : Number, default : 0}, 
		phone:{type : String},
		age:{type : Number, default : 0}, 
		dealAmount:{type : Number, default : 0}, 
		dealType:{type : String, default : 'w'},
		dealDate:{type : Date, default: Date.now},
		birthday:{type : Date},
		eMail:{type : String},
		remark:{type : String},
		job:{type : String}			
});



/* ��� mongoose ʵ������
studentSchema.methods.findbyusername = function(username, callback) {
    return this.model('mongoose').find({username: username}, callback);
}*/
// ��� mongoose ��̬����,��̬������Model�����ʹ��
studentSchema.statics.findbytitle = function(title, callback) {
    return this.model('mongoose').find({title: title}, callback);
}
// model
var mongooseModel = db.model('student', studentSchema);
// ���Ӽ�¼ ����model����
app.put('/class', function (req, res) { 
		console.log('req.body:'+req.body._ids+ " from:"+req.body.from+" to:"+req.body.to+" remark:"+req.body.remark +" timePeriod:"+req.body.timePeriod);
		//TODO: add class info
		var _idsArray = req.body._ids.split("; ");
		var _idsArrayLen = _idsArray.length;
		for (i=0;i<_idsArrayLen;i++ ) {
			//console.log('test class _idsArray[i]:'+_idsArray[i]);
				mongooseModel.findById(_idsArray[i],function(err,student){
					if(student){
						//TODO:student.class = req.body.class;
			   		var newClass = {
			   		"classDate":req.body.classDate,//�Ͽ�����
		  			"duringHour":req.body.duringHour,//��ʱ
			  		"timePeriod":req.body.timePeriod,//morning,afternoon and night
						"from":req.body.from,
						"to":req.body.to,
						"remark":req.body.remark};
						student.completeCourseAmount = parseFloat(student.completeCourseAmount) + parseFloat(req.body.duringHour);
						console.log('test class student.completeCourseAmount:'+student.completeCourseAmount);
			   		student.class.push(newClass);
						//student.markModified(student.class);
			   		student.save(function(err){console.log('add class error:'+err);});
					}
		   		
				})
		}
    
		res.send('add class ok');
});
app.put('/student', function (req, res) { 
		console.log('req.body:'+req.body);
		/*
		$.ajax({
	         type: "POST",
	         url: "your url",
	         dataType:'json',
	         data: "email="+$('.email').val()+"&pwd="+$('.pwd').val(),
	         success:function(msg){...}
	});
	your server :
	
	var email = req.body.email,
	      pwd = req.body.pwd;
	//do something...
		*/
		
		//console.log('req.body.fullName:'+req.body.fullName+'  req.body.dealDate:'+req.body.dealDate);
		var doc = {fullName : req.body.fullName,
			      		weixinName: req.body.weixinName,
			      		courseType: req.body.courseType,
			      		constellation: req.body.constellation,
			      		totalCourseAmount: req.body.totalCourseAmount,
			      		completeCourseAmount: req.body.completeCourseAmount,
			      		expectEndDate: req.body.expectEndDate,
			      		dealAmount: req.body.dealAmount,
			      		dealType: req.body.dealType,
			      		dealDate: req.body.dealDate,
			      		phone: req.body.phone,
			      		age: req.body.age,
			      		birthday: req.body.birthday,
			      		eMail: req.body.eMail,
			      		remark: req.body.remark,
			      		job: req.body.job};
		mongooseModel.create(doc, function(error){
		    if(error) {
		        console.log(error);
		    } else {
		        console.log('add student ok');
		    }
		    // �ر����ݿ�����
		    //db.close();
		});
		
		//res.send(JSON.stringify({'response':'add ok'})); 
		res.send('add ok');
  }
)

// Update��¼ ����model����
app.post('/student', function (req, res) { 
		//console.log('req.body:'+req.body);
		
		console.log('req.body._id:'+req.body._id+'req.body.fullName:'+req.body.fullName);

		mongooseModel.findById(req.body._id,function(err,student){
      student.fullName = req.body.fullName;
      student.weixinName= req.body.weixinName;
  		student.courseType= req.body.courseType;
  		student.constellation= req.body.constellation;
  		student.totalCourseAmount= req.body.totalCourseAmount;
  		student.completeCourseAmount= req.body.completeCourseAmount;
  		student.expectEndDate= req.body.expectEndDate;
  		student.dealAmount= req.body.dealAmount;
  		student.dealType= req.body.dealType;
  		student.dealDate= req.body.dealDate;
  		student.phone= req.body.phone;
  		student.age= req.body.age;
  		student.birthday= req.body.birthday;
  		student.eMail= req.body.eMail;
  		student.remark= req.body.remark;
  		student.job= req.body.job;
  		
      student.save(function(err){console.log('update student error:'+err);});
    });
		
		console.log('update student '+req.body.fullName+ ' ok'); res.send('update student ok'); 
  }
)

app.get('/student', function (req, res) { 
	
	mongooseModel.find(function(err,persons){
      //��ѯ��������person
      //console.log('find all persons:'+persons);
		  res.send(JSON.stringify(persons)); 
    }).sort({"_id":-1});

})

app.delete('/student', function (req, res) { 
	
			mongooseModel.findById(req.body._id,function(err,student){

      	student.remove(function(err){console.log('delete student error:'+err);});
    	});
      console.log('delete student:'+req.body._id);
		  res.send('delete student done'); 
    

}
)

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("server started, address is: http://%s:%s", host, port)

})