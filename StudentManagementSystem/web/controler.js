

define(function(){
	
	  require.config({
		    paths : {
		        "jquery" : "libs/jquery/1.10.2/jquery.min",
		        "jquerymobile" : "libs/jquerymobile/1.4.5/jquery.mobile-1.4.5.min"
		        
		    }
		})
		require(["jquery","jquerymobile"],function($){
			//**************
			//Global context
			var _fullData;
			var _selectedStudentObjId;//main page select student to edit
			var _selectedStudentObjId4classList;//main page select student to view class list
			var _ncp_selectedStudentJson = [];//new course selected students json Array
			var _ncp_selectedStudentObjIdlist="";//selected student list for display
		  
		  console.log("init start");
    	init();
		  
		  function init(){
    		//Auto search all
    		console.log("initMainpageData start");
      	getAllInfo();
      	//********************************
      	//Bind all the action button event     	
      	$("#addStuBtn").bind("click",function(){
				  addStudent();
				});
				
				$("#updateStuBtn").bind("click",function(){
				  updateStudent();
				});
				
				$("#delStuBtn").bind("click",function(){
				  deleteStudent();
				});
				
				$("#ncp_addClassBtn").bind("click",function(){
				  addClass();
				});
				
				$("#nsp_courseType_P").bind("click",function(){
				  $('#nsp_totalCourseAmount').val('50');
				  $('#nsp_dealAmount').val('18000');
				});
				$("#nsp_courseType_J").bind("click",function(){
				  $('#nsp_totalCourseAmount').val('25');
				  $('#nsp_dealAmount').val('6800');
				});
				
				$("#ncdp_timePeriod_M").bind("click",function(){
				  $('#ncdp_from').val('10:00');
    	    $('#ncdp_to').val('12:00');
				});
				$("#ncdp_timePeriod_A").bind("click",function(){
				  $('#ncdp_from').val('14:00');
    	    $('#ncdp_to').val('17:00');
				});
				$("#ncdp_timePeriod_E").bind("click",function(){
				  $('#ncdp_from').val('19:00');
    	    $('#ncdp_to').val('22:00');
				});
				
				
				$("#calendarBtn").bind("click",function(){
				   /*$.mobile.changePage("index.html",
           { transition: "slideup" });*/
           window.location.href = "cal.html";
				});
      	
      	$("#main_filter").bind("change",function(){
					if ($("#main_filter").val()<=2) {
						initMainpageData($("#main_filter").val());
					}else {
						alert("Not implemented filter option:"+$("#main_filter").val());
					}
				  
				}); 
      	
      	/* 
      	$.get("http://127.0.0.1:8081/student/",function(data){ alert(data); 
      	$("#myFilter").val(data); } );*/
      }  
      
  		function setProgressBar(complete,total){ 
  			console.log("view student classpage page class complete:"+complete+" total:"+total);
  			 
  			if(!total){total=0;}
  			if(!complete){complete=0;}
  			if (!isNaN(complete) && !isNaN(total) && total>=0) {
  				var progress = 100*complete/total;
  				console.log("view student classpage page class complete progress:"+progress+"%");
  				var progressBarWidth =progress*$(".container").width()/ 100; 
			    if (progress>=80) {
			    	$(".progressbar").css({
		        'background-color': '#C8F8B0'
		        });
			    } 
			    if (progress<=40) {
			    	$(".progressbar").css({
		        'background-color': '#F48B80'
		        });
			    } 
			    if (progress>100) {
			    	$(".progressbar").css({
		        'background-color': '#FF0000'
		        });
		        progressBarWidth = $(".container").width();
			    }
			    
			    $(".progressbar").width(progressBarWidth).html(progress.toFixed(0) + "% ");
					$("#scp_progressNumber").html(complete+'/'+total);
  			}
			}	
			
			function clearProgressBar(){
				$(".progressbar").width(0).html("0% ");
				$("#scp_progressNumber").html('0/0');
			
			}
			
      function getAllInfo(){
	      	
	      	$.ajax({ url: "http://192.168.0.105:8081/student", type:"GET", 
		      	dataType:"json", context: document.body,success: function(data){
		      		 //save to global context
		      		  _fullData = data;
		      			initMainpageData(0);
		      	 },error:function(err){ 
		      			alert(err); }}); 
		      	
      }
      //*****************
      //Main page init
      //*****************
      function initMainpageData(filterOption){
      	if(_fullData){
      		console.log("initMainpageData students with filterOption:"+filterOption);
      		var totalProfessionalStudents=0;
      		var totalJuniorStudents=0;
      		var totalPotentialStudents=0;
      		var totalCourseAmount;
      		var completeCourseAmount;
      		var courseTypeIconHtml;
      		var weiXinNameHtml;
      		$("#main_studentList").html('');//clean before add all
      		$.each(_fullData, function(i, student) {  //this指向当前元素 i; //i表示Array当前下标 value; //value表示Array当前元素 
      				//filter logic
      				console.log('1-'+student._id + ' - '+student.dealType);
      				if (filterOption == 0) {
      					//Full list
      				}else if (filterOption == 1) {
      					if (student.dealType.toLowerCase() != 'w' && student.dealAmount >=0) {//未付款学生
      						console.log('2-'+student._id + ' - '+student.dealType);
      						return true;
      					}
      				}else if (filterOption == 2) {
      					
      				}else {
      					alert("filter option not implemented!");
      				}
      				
      				totalCourseAmount = student.totalCourseAmount?student.totalCourseAmount:0;
      				completeCourseAmount = student.completeCourseAmount?student.completeCourseAmount:0;
      				courseTypeIconHtml = '';
      				if(student.courseType.toLowerCase() === 'p'){
      					courseTypeIconHtml = '<img src=".\\image\\pro.png">';
      					totalProfessionalStudents++;
      				}else if(student.courseType.toLowerCase() === 'c'){
      					courseTypeIconHtml = '<img src=".\\image\\reserve_stu.png">';
      					totalPotentialStudents++;
      				}else if(student.courseType.toLowerCase() === 'j'){
      					totalJuniorStudents++;
      				}
      				
      				if (completeCourseAmount>=totalCourseAmount) {
      					highLightCounterBackgroundHtml = 'style="background-color:#ff9090">';
      				}else {
      					highLightCounterBackgroundHtml = '>';
      				}
      				
      				weiXinNameHtml = student.weixinName?'('+student.weixinName+')':'';
      				console.log('3-'+student._id+' append student.dealType:'+student.dealType);
      				$("#main_studentList").append('<li id="main_student_'+student._id+'"><a href="#studentclasspage">'+'<span>'+courseTypeIconHtml+'</span>'+student.fullName+weiXinNameHtml+'<span class="ui-li-count"'+highLightCounterBackgroundHtml+completeCourseAmount+'/'+totalCourseAmount+"</span></a> <a href='#updatestudentpage' data-icon='edit' id='edit_student_"+student._id+"'>Edit student</a></li>");
      				
      				$("#edit_student_"+student._id).bind("click",function(){
							  _selectedStudentObjId =  student._id;
							  console.log("selected to update student id:"+_selectedStudentObjId);
							});
							
							$("#main_student_"+student._id).bind("click",function(){
							  _selectedStudentObjId4classList =  student._id;
							  console.log("selected to view student class list:"+_selectedStudentObjId4classList);
							});
      		}); 
      		//to call jquery mobile to rebind the class to this html section 
  				$("#main_studentList").filterable("destroy");
  				$("#main_studentList").filterable();
  				
  				$("#main_totalStudents").html(_fullData.length);
  				$("#main_totalProfessionalStudents").html(totalProfessionalStudents);
  				$("#main_totalPotentialStudents").html(totalPotentialStudents);
  				$("#main_totalJuniorStudents").html(totalJuniorStudents);
      		
      	}
      
      }
      
      function sortClassResults(classes, prop, asc) {
		    classes = classes.sort(function(a, b) {
		        if (asc) {
		            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
		        } else {
		            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
		        }
		    });
		}
      
      $(document).on("pagebeforeshow","#studentclasspage",function(){
      	
      	
      	$("#scp_classPracticalList").html('');//clean before add class list
    		console.log("view student classpage page:selected to student id:"+_selectedStudentObjId4classList); 
      	//loop to add class
      	//TODO; loop for practical session, sorting by date, recent in front
      	var studentLen = _fullData.length;
      	var typeIconHtml;
      	var AMPMHtml;
      	var classLen;
      	var i;
      	var j;
      	var day;
			  var today = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');  
			  var week;
      	for(i=0; i<studentLen; i++){
      			if(_fullData[i]._id === _selectedStudentObjId4classList){
      				  $('#scp_studentName').html(_fullData[i].fullName+': ');
      					setProgressBar(_fullData[i].completeCourseAmount,_fullData[i].totalCourseAmount);
      					//TODO get and display practical info here
      					$("#scp_classPracticalList").html('');//clean before add all
      					typeIconHtml='';
      					//TODO check whether class or practical
      					typeIconHtml = '<span><img src=".\\image\\calendar.png"></span>';
      					AMPMHtml='';
      					classLen = _fullData[i].class.length;
		      			if(classLen===0){
		      				$("#scp_classPracticalList").append('<div><span>No class record!</span></div>');
		      				break;
		      			}	
		      			sortClassResults(_fullData[i].class,'classDate',false);
		      			console.log('classLen:'+classLen);
      					for(j=0; j<classLen; j++){
      						AMPMHtml='';
	      					if (_fullData[i].class[j].timePeriod) {
	      						if (_fullData[i].class[j].timePeriod.toLowerCase()==='m') {
		      						AMPMHtml= 'Morning';
		      					}else if (_fullData[i].class[j].timePeriod.toLowerCase()==='a') {
		      						AMPMHtml= 'Afternoon';
		      					}else{
		      						AMPMHtml= 'Evening';
		      					} 
	      					}
	      					console.log(_fullData[i].class[j]);
								  day = new Date(Date.parse(_fullData[i].class[j].classDate.substr(0,10)));   //需要正则转换的则 此处为 ： var day = new Date(Date.parse(date.replace(/-/g, '/')));  
								  week = today[day.getDay()];  
	      					$("#scp_classPracticalList").append('<div data-role="collapsible"><h4>'+typeIconHtml+week+', '+_fullData[i].class[j].classDate.substr(0,10) + ' ' + AMPMHtml + '<span class="ui-li-count">'+ _fullData[i].class[j].duringHour+ '</span></h4>'+ '<div><span>Time: '+ _fullData[i].class[j].from +' - '+_fullData[i].class[j].to +'</span></div>'+ '<div style="border:1px solid black;">Remark: <span>'+_fullData[i].class[j].remark+'</span></div>');
      					}
      					$('#scp_classPracticalList').collapsibleset().trigger("create");//need to refresh after set value
      					
      					
      					/*
						      	<div data-role="collapsible"><h4>
						      	<span><img src=".\\image\\pro.png"></span>
										Saturday 20 Jul 2016 Afternoon
										<span class="ui-li-count">5</span></h4>
							      <div><span>Time：14:00-17:00</span></div>
							      <div style="border:1px solid black;">Remark: <span>基础课 双边友好对话协商是妥善处理中菲南海争议的唯一正确可行途径，我们希望菲律宾新一届政府与中方相向而行，摒弃旧政府错误做法，回到与中方对话协商的正确轨道上来，为改善和发展中菲关系做出努力。
						问：据了解，中方将与联合国共同举办关于网络问题的国际研讨会。请介绍有关情况。中方举办这次会议是出于什么考虑？</span>
										</div>
						    </div>
						    */
      					
      				break;
      			}
      	}
      	
      })
      
      $(document).on("pagehide","#studentclasspage",function(){
      	clearProgressBar();
      	
      	//TODO clear the stuedent name
      	$('#scp_studentName').html('');
      
      })
      
      $(document).on("pagebeforeshow","#newclassstudentpage",function(){ 
      	if(_fullData){
      		console.log("init newclassstudentpage");
      		$("#ncp_studentList").html('');//clean before add all
      		$.each(_fullData, function(i, student) {  //this指向当前元素 i; //i表示Array当前下标 value; //value表示Array当前元素 
      				var totalCourseAmount = student.totalCourseAmount?student.totalCourseAmount:0;
      				var completeCourseAmount = student.completeCourseAmount?student.completeCourseAmount:0;
      				var courseTypeIconHtml = '';
      				if(student.courseType.toLowerCase() === 'p'){
      					courseTypeIconHtml = '<img src=".\\image\\pro.png">';
      				}else if(student.courseType.toLowerCase() === 'c'){
      					courseTypeIconHtml = '<img src=".\\image\\reserve_stu.png">';
      				}
      				
      				if (completeCourseAmount>=totalCourseAmount) {
      					highLightCounterBackgroundHtml = 'style="background-color:#ff9090">';
      				}else {
      					highLightCounterBackgroundHtml = '>';
      				}
      				var weiXinNameHtml = student.weixinName?'('+student.weixinName+')':'';
      				$("#ncp_studentList").append('<li id="ncp_student'+student._id+'"><a href="#">'+'<span><img id="ncp_sel_student_img_'+student._id+'" style="visibility:hidden" src=".\\image\\tick.png">'+courseTypeIconHtml+'</span>'+student.fullName+weiXinNameHtml+'<span class="ui-li-count"'+ highLightCounterBackgroundHtml+completeCourseAmount+'/'+totalCourseAmount+"</span></a></li>");
      				
      				//TODO: bind student onclick event 
      				$("#ncp_student"+student._id).bind("click",function(){
      					//TODO: click one more time to uncheck, add status flag, checked =true/false
      					var selStudentLen = _ncp_selectedStudentJson.length;
      					var selected = false;
				      	for(var i=0; i<=selStudentLen; i++){
				      			if(i>0 && (_ncp_selectedStudentJson[i-1]._id === student._id)){
				      				//already selected, unchecked
				      				//remove in global context json
				      				_ncp_selectedStudentJson.splice(i-1,1);
				      				//disable the visibility of the tick icon in front of the unselected student
				      				$("#ncp_sel_student_img_"+student._id).css('visibility', 'hidden');
				      				
				      				console.log("New course: unselected student:"+student.fullName);
				      				selected = true;
				      				break;
			      				}
				      	}			
      					if (!selected) {
			      					//not selected
	  									//store in global context json
			      					_ncp_selectedStudentJson.push(student);
										  
										  //enable the visibility of the tick icon in front of the selected student
										  $("#ncp_sel_student_img_"+student._id).css('visibility', 'visible');
										  console.log("New course: selected student:"+student.fullName);
			      		}
			      		//refresh selected student list in the header
				      	refreshSelectedStuList();
      					
							});
      		}); 
      		//to call jquery mobile to rebind the class to this html section 
  				$("#ncp_studentList").filterable("destroy");
  				$("#ncp_studentList").filterable();
      		
      	}
      
      });
      
     $(document).on("pageshow","#newclassstudentpage",function(){ 
     	$("#selectedStudents").html("No selected student yet.");
      	_ncp_selectedStudentJson=[];
      	$("#ncp_addClassBtn").text("Add (0)");
     	$('#ncdp_classDate').val(new Date().format("yyyy-MM-dd"));
    		$('#ncdp_duringHour').val('3');
    	  $('#ncdp_from').val('');
    	  $('#ncdp_to').val('');
    	  $('#ncdp_remark').val('');
     	}) 
      
      $(document).on("pagehide","#newclassstudentpage",function(){ 
      	//clear the status of the timePirod
      	$('#ncdp_timePeriod_M').attr('checked',false).checkboxradio('refresh');/*
    		$('#ncdp_lable_timePeriod_M').addClass('ui-radio-off');
    		$('#ncdp_lable_timePeriod_M').removeClass('ui-radio-on');
    		$('#ncdp_lable_timePeriod_M').removeClass('ui-btn-active');*/
    		$('#ncdp_timePeriod_A').attr('checked',false).checkboxradio('refresh');/*
    		$('#ncdp_lable_timePeriod_A').addClass('ui-radio-off');
    		$('#ncdp_lable_timePeriod_A').removeClass('ui-radio-on');
    		$('#ncdp_lable_timePeriod_A').removeClass('ui-btn-active');*/
    		$('#ncdp_timePeriod_E').attr('checked',true).checkboxradio('refresh');/*
    		$('#ncdp_lable_timePeriod_E').addClass('ui-radio-off');
    		$('#ncdp_lable_timePeriod_E').removeClass('ui-radio-on');
    		$('#ncdp_lable_timePeriod_E').removeClass('ui-btn-active');*/

    });
      
      function refreshSelectedStuList () {
      	$("#selectedStudents").html("Selected:");
      	_ncp_selectedStudentObjIdlist ="";
      	var selStudentLen = _ncp_selectedStudentJson.length;
      	for(var i=0; i<selStudentLen; i++){
      		$("#selectedStudents").append(_ncp_selectedStudentJson[i].fullName+"; ");
      		_ncp_selectedStudentObjIdlist = _ncp_selectedStudentObjIdlist.concat(_ncp_selectedStudentJson[i]._id+"; ");
      	}
      	$("#ncp_addClassBtn").text("Add ("+selStudentLen+")");
      }
      
      //update page init: bind to display the selected student info from main page	
      $(document).on("pagebeforeshow","#updatestudentpage",function(){ 
	      	console.log("update page:selected to update student id:"+_selectedStudentObjId); 
	      	//loop to update all field in the all data
	      	var studentLen = _fullData.length;
	      	for(var i=0; i<studentLen; i++){
	      			if(_fullData[i]._id === _selectedStudentObjId){
	      					$('#usp__id').val(_fullData[i]._id);
	      					$('#usp_fullName').val(_fullData[i].fullName);
					      	$('#usp_weixinName').val(_fullData[i].weixinName);
					      	$('#usp_courseType').val(_fullData[i].courseType);
					      	
					      	if(_fullData[i].courseType.toLowerCase() === 'p'){
					      		$('#usp_courseType_P').attr('checked',true).checkboxradio('refresh');
					      		$('#usp_lable_courseType_P').removeClass('ui-radio-off');
					      		$('#usp_lable_courseType_P').addClass('ui-radio-on');
					      		$('#usp_lable_courseType_P').addClass('ui-btn-active');
					      	}else if (_fullData[i].courseType.toLowerCase() === 'j') {
					      		$('#usp_courseType_J').attr('checked',true).checkboxradio('refresh');
					      		$('#usp_lable_courseType_J').removeClass('ui-radio-off');
					      		$('#usp_lable_courseType_J').addClass('ui-radio-on');
					      		$('#usp_lable_courseType_J').addClass('ui-btn-active');
					      	}else if (_fullData[i].courseType.toLowerCase() === 'c') {
					      		$('#usp_courseType_C').attr('checked',true).checkboxradio('refresh');
					      		$('#usp_lable_courseType_C').removeClass('ui-radio-off');
					      		$('#usp_lable_courseType_C').addClass('ui-radio-on');
					      		$('#usp_lable_courseType_C').addClass('ui-btn-active');
					      	}
					      	
					      	$('#usp_constellation').val(_fullData[i].constellation);
					      	$('#usp_constellation').selectmenu('refresh', true);//need to refresh after set value
					      	
					      	
					      	$('#usp_totalCourseAmount').val(_fullData[i].totalCourseAmount);
					      	$('#usp_completeCourseAmount').val(_fullData[i].completeCourseAmount);
					      	$('#usp_expectEndDate').val(_fullData[i].expectEndDate?_fullData[i].expectEndDate.substr(0,10):'');
					      	$('#usp_dealAmount').val(_fullData[i].dealAmount);
					      	if(_fullData[i].dealType.toLowerCase() === 'y'){
					      		$('#usp_dealType_Y').attr('checked',true).checkboxradio('refresh');
					      		$('#usp_lable_dealType_Y').removeClass('ui-radio-off');
					      		$('#usp_lable_dealType_Y').addClass('ui-radio-on');
					      		$('#usp_lable_dealType_Y').addClass('ui-btn-active');
					      	}else if (_fullData[i].dealType.toLowerCase() === 'f') {
					      		$('#usp_dealType_F').attr('checked',true).checkboxradio('refresh');
					      		$('#usp_lable_dealType_F').removeClass('ui-radio-off');
					      		$('#usp_lable_dealType_F').addClass('ui-radio-on');
					      		$('#usp_lable_dealType_F').addClass('ui-btn-active');
					      	}else if (_fullData[i].dealType.toLowerCase() === 'w') {
					      		$('#usp_dealType_W').attr('checked',true).checkboxradio('refresh');/*
					      		$('#usp_lable_dealType_W').removeClass('ui-radio-off');
					      		$('#usp_lable_dealType_W').addClass('ui-radio-on');
					      		$('#usp_lable_dealType_W').addClass('ui-btn-active');*/
					      	}
					      	
					      	$('#usp_dealDate').val(_fullData[i].dealDate?_fullData[i].dealDate.substr(0,10):'');
					      	$('#usp_phone').val(_fullData[i].phone);
					      	$('#usp_age').val(_fullData[i].age);
					      	$('#usp_birthday').val(_fullData[i].birthday?_fullData[i].birthday.substr(0,10):'');
					      	$('#usp_eMail').val(_fullData[i].eMail);
					      	$('#usp_remark').val(_fullData[i].remark);
					      	$('#usp_job').val(_fullData[i].job);
	      					
	      					break;
	      			}
	      	}
      	
      	});	
      	
      	$(document).on("pagehide","#newstudentpage",function(){ 
	      	console.log("Clear the data in the new student page"); 
									$("#main_filter").val(0);
									$('#main_filter').selectmenu('refresh', true);
	      					$('#nsp_fullName').val('');
					      	$('#nsp_weixinName').val('');
					      	$('#nsp_constellation').val('');
					      	$('#nsp_constellation').selectmenu('refresh', true);
					      	//$('#nsp_courseType').val('C');
					      		$('#nsp_courseType_P').attr('checked',false).checkboxradio('refresh');/*
					      		$('#nsp_lable_courseType_P').addClass('ui-radio-off');
					      		$('#nsp_lable_courseType_P').removeClass('ui-radio-on');
					      		$('#nsp_lable_courseType_P').removeClass('ui-btn-active');*/
					      		$('#nsp_courseType_J').attr('checked',false).checkboxradio('refresh');/*
					      		$('#nsp_lable_courseType_J').addClass('ui-radio-off');
					      		$('#nsp_lable_courseType_J').removeClass('ui-radio-on');
					      		$('#nsp_lable_courseType_J').removeClass('ui-btn-active');*/
					      		$('#nsp_courseType_C').attr('checked',true).checkboxradio('refresh');/*
					      		$('#nsp_lable_courseType_C').addClass('ui-radio-off');
					      		$('#nsp_lable_courseType_C').removeClass('ui-radio-on');
					      		$('#nsp_lable_courseType_C').removeClass('ui-btn-active');*/
					      	$('#nsp_totalCourseAmount').val('');
					      	$('#nsp_completeCourseAmount').val('');
					      	$('#nsp_expectEndDate').val('');
					      	$('#nsp_dealAmount').val('');
					      	//$('#nsp_dealType').val('W');
					      		$('#nsp_dealType_Y').attr('checked',false).checkboxradio('refresh');/*
					      		$('#nsp_lable_dealType_Y').addClass('ui-radio-off');
					      		$('#nsp_lable_dealType_Y').removeClass('ui-radio-on');
					      		$('#nsp_lable_dealType_Y').removeClass('ui-btn-active');*/
					      		$('#nsp_dealType_F').attr('checked',false).checkboxradio('refresh');/*
					      		$('#nsp_lable_dealType_F').addClass('ui-radio-off');
					      		$('#nsp_lable_dealType_F').removeClass('ui-radio-on');
					      		$('#nsp_lable_dealType_F').removeClass('ui-btn-active');*/
					      		$('#nsp_dealType_W').attr('checked',true).checkboxradio('refresh');/*
					      		$('#nsp_lable_dealType_W').addClass('ui-radio-off');
					      		$('#nsp_lable_dealType_W').removeClass('ui-radio-on');
					      		$('#nsp_lable_dealType_W').removeClass('ui-btn-active');*/
					      	$('#nsp_dealDate').val('');
					      	$('#nsp_phone').val('');
					      	$('#nsp_age').val('');
					      	$('#nsp_birthday').val('');
					      	$('#nsp_eMail').val('');
					      	$('#nsp_remark').val('');
					      	$('#nsp_job').val('');
      	});	
      	
      	$(document).on("pagehide","#updatestudentpage",function(){ 
	      	console.log("Clear the data in the update student page"); 
									$("#main_filter").val(0);
									$('#main_filter').selectmenu('refresh', true);
	      					$('#usp_fullName').val('');
					      	$('#usp_weixinName').val('');
					      	$('#usp_courseType').val('');
					      		$('#usp_courseType_P').attr('checked',false).checkboxradio('refresh');/*
					      		$('#usp_lable_courseType_P').addClass('ui-radio-off');
					      		$('#usp_lable_courseType_P').removeClass('ui-radio-on');
					      		$('#usp_lable_courseType_P').removeClass('ui-btn-active');*/
					      		$('#usp_courseType_J').attr('checked',false).checkboxradio('refresh');/*
					      		$('#usp_lable_courseType_J').addClass('ui-radio-off');
					      		$('#usp_lable_courseType_J').removeClass('ui-radio-on');
					      		$('#usp_lable_courseType_J').removeClass('ui-btn-active');*/
					      		$('#usp_courseType_C').attr('checked',false).checkboxradio('refresh');/*
					      		$('#usp_lable_courseType_C').addClass('ui-radio-off');
					      		$('#usp_lable_courseType_C').removeClass('ui-radio-on');
					      		$('#usp_lable_courseType_C').removeClass('ui-btn-active');*/
					      	$('#usp_constellation').val('');
					      	$('#usp_constellation').selectmenu('refresh', true);
					      	$('#usp_totalCourseAmount').val('');
					      	$('#usp_completeCourseAmount').val('');
					      	$('#usp_expectEndDate').val('');
					      	$('#usp_dealAmount').val('');
					      	$('#usp_dealType').val('');
					      		$('#usp_dealType_Y').attr('checked',false).checkboxradio('refresh');/*
					      		$('#usp_lable_dealType_Y').addClass('ui-radio-off');
					      		$('#usp_lable_dealType_Y').removeClass('ui-radio-on');
					      		$('#usp_lable_dealType_Y').removeClass('ui-btn-active');*/
					      		$('#usp_dealType_F').attr('checked',false).checkboxradio('refresh');/*
					      		$('#usp_lable_dealType_F').addClass('ui-radio-off');
					      		$('#usp_lable_dealType_F').removeClass('ui-radio-on');
					      		$('#usp_lable_dealType_F').removeClass('ui-btn-active');*/
					      		$('#usp_dealType_W').attr('checked',false).checkboxradio('refresh');/*
					      		$('#usp_lable_dealType_W').addClass('ui-radio-off');
					      		$('#usp_lable_dealType_W').removeClass('ui-radio-on');
					      		$('#usp_lable_dealType_W').removeClass('ui-btn-active');*/
					      	$('#usp_dealDate').val('');
					      	$('#usp_phone').val('');
					      	$('#usp_age').val('');
					      	$('#usp_birthday').val('');
					      	$('#usp_eMail').val('');
					      	$('#usp_remark').val('');
					      	$('#usp_job').val('');
      	});
     	
      function addStudent(){
      	//TODO data validate and pop not invalide input note 
      	var fullname = $('#nsp_fullName').val();
      	if (!fullname || $.trim(fullname)==='') {
      		alert("Please input student name!");return;
      	}
      	var weixinName = $('#nsp_weixinName').val()?$('#nsp_weixinName').val():'';
      	var courseType='C';//default
		    var courseTypeObj = document.getElementsByName('nsp_courseType');
		    if(courseTypeObj!=null){
		        var i;
		        for(i=0;i<courseTypeObj.length;i++){
		            if(courseTypeObj[i].checked){
		                courseType = courseTypeObj[i].value;         
		            }
		        }
		    }
      	
      	var constellation = $('#nsp_constellation').val()?$('#nsp_constellation').val():0;
      	
      	var totalCourseAmount = $('#nsp_totalCourseAmount').val()?$('#nsp_totalCourseAmount').val():50;
      	var completeCourseAmount = $('#nsp_completeCourseAmount').val()?$('#nsp_completeCourseAmount').val():0;
      	var expectEndDate = $('#nsp_expectEndDate').val()?$('#nsp_expectEndDate').val():Date.now;
      	var dealAmount = $('#nsp_dealAmount').val()?$('#nsp_dealAmount').val():0;
      	var dealType='W';
      	var dealTypeObj = document.getElementsByName('nsp_dealType');
		    if(dealTypeObj!=null){
		        var j;
		        for(j=0;j<dealTypeObj.length;j++){
		            if(dealTypeObj[j].checked){
		                dealType = dealTypeObj[j].value;
		            }
		        }
		    }
      	
      	var dealDate = $('#nsp_dealDate').val()?$('#nsp_dealDate').val():Date.now;
      	var phone = $('#nsp_phone').val();
      	var age = $('#nsp_age').val()?$('#nsp_age').val():0;
      	var birthday = $('#nsp_birthday').val();
      	var eMail = $('#nsp_eMail').val();
      	var remark = $('#nsp_remark').val();
      	var job = $('#nsp_job').val();
      	
      	//alert('Add student nsp_fullName:'+$('#nsp_fullName').val());
      	$.ajax({ url: "http://192.168.0.105:8081/student", type:"PUT", 
		      	dataType:"text", data:{fullName: fullname,
		      		weixinName: weixinName,
		      		courseType: courseType,
		      		constellation: constellation,
		      		totalCourseAmount: totalCourseAmount,
		      		completeCourseAmount: completeCourseAmount,
		      		expectEndDate: expectEndDate,
		      		dealAmount: dealAmount,
		      		dealType: dealType,
		      		dealDate: dealDate,
		      		phone: phone,
		      		age: age,
		      		birthday: birthday,
		      		eMail: eMail,
		      		remark: remark,
		      		job: job
		      		}, success: function(data){ 
		      			console.log('save ok, call snaper notification'+data);
		      			//refresh main page data and show notice
		      			getAllInfo();
		      			$.mobile.changePage ('#mainpage');
		      			$('#mp_addStudentDone').click();
		      			
		      	 },error:function(err){ 
		      			alert('error adding new student:'+err); }}); 
      	}
      	
    	function updateStudent(){
    		
    		//TODO data validate and pop not invalide input note 
    		var _id = $('#usp__id').val();
      	var fullname = $('#usp_fullName').val();
      	var weixinName = $('#usp_weixinName').val();
      	var courseTypeObj = document.getElementsByName('usp_courseType');
		    if(courseTypeObj!=null){
		        var i;
		        for(i=0;i<courseTypeObj.length;i++){
		            if(courseTypeObj[i].checked){
		                courseType = courseTypeObj[i].value;         
		            }
		        }
		    }
      	var constellation = $('#usp_constellation').val();
      	var totalCourseAmount = $('#usp_totalCourseAmount').val();
      	var completeCourseAmount = $('#usp_completeCourseAmount').val();
      	var expectEndDate = $('#usp_expectEndDate').val();//TODO:format to date
      	var dealAmount = $('#usp_dealAmount').val();
      	var dealTypeObj = document.getElementsByName('usp_dealType');
		    if(dealTypeObj!=null){
		        var j;
		        for(j=0;j<dealTypeObj.length;j++){
		            if(dealTypeObj[j].checked){
		                dealType = dealTypeObj[j].value;
		            }
		        }
		    }
      	var dealDate = $('#usp_dealDate').val();//TODO:format to date
      	var phone = $('#usp_phone').val();
      	var age = $('#usp_age').val();
      	var birthday = $('#usp_birthday').val();//TODO:format to date
      	var eMail = $('#usp_eMail').val();
      	var remark = $('#usp_remark').val();
      	var job = $('#usp_job').val();
      	
      	$.ajax({ url: "http://192.168.0.105:8081/student", type:"POST", 
		      	dataType:"text", data:{_id:_id,
		      		fullName: fullname,
		      		weixinName: weixinName,
		      		courseType: courseType,
		      		constellation: constellation,
		      		totalCourseAmount: totalCourseAmount,
		      		completeCourseAmount: completeCourseAmount,
		      		expectEndDate: expectEndDate,
		      		dealAmount: dealAmount,
		      		dealType: dealType,
		      		dealDate: dealDate,
		      		phone: phone,
		      		age: age,
		      		birthday: birthday,
		      		eMail: eMail,
		      		remark: remark,
		      		job: job
		      		}, success: function(data){ 
		      			//TODO:call snaper notification
		      			console.log('update ok, call snaper notification'+data);
		      			//refresh main page data and show notice
		      			getAllInfo();
		      			$.mobile.changePage ('#mainpage');
		      			$('#mp_updateStudentDone').click();
		      	 },error:function(err){ 
		      			alert('error updating student:'+err); }}); 
    	}
    	function deleteStudent(){
    		
    	//TODO data validate and pop not invalide input note 
      	var _id = $('#usp__id').val();
      	      	
      	//alert('Delete student usp__id:'+$('#usp__id').val());
      	$.ajax({ url: "http://192.168.0.105:8081/student", type:"DELETE", 
		      	dataType:"text", data:{_id: _id	}, success: function(data){ 
		      			//TODO:call snaper notification
		      			console.log('Delete ok, call snaper notification'+data);
		      			//refresh main page data and show notice
		      			getAllInfo();
		      			$.mobile.changePage ('#mainpage');
		      			$('#mp_delStudentDone').click();
		      	 },error:function(err){ 
		     alert('error deleting student:'+err); }}); 
    	
    	}
    	
    	function addClass(){
    		if (!$('#ncdp_classDate').val()) {
    			alert("please select class date.");return;
    		}
    		if (_ncp_selectedStudentJson.length===0) {
    			alert("please select student before add class.");return;
    		}
    		var duringHour = $('#ncdp_duringHour').val();
    		if(duringHour===null || duringHour ==='') {
    			alert("please input valide class during hour.");return;
    		}
    		duringHour = parseFloat(duringHour);
    		if(isNaN(duringHour)|| duringHour<=0) {
    			alert("please input valide class during hour.");return;
    		}
	  	  //TODO: add class info to the request
	  	  var classDate = $('#ncdp_classDate').val();
	  	  
	  	  var from = $('#ncdp_from').val();
	  	  var to = $('#ncdp_to').val();
	  	  var remark = $('#ncdp_remark').val();
	  	  var timePeriod;
	  	  var timePeriodObj = document.getElementsByName('ncdp_timePeriod');
		    if(timePeriodObj!=null){
		        var i;
		        for(i=0;i<timePeriodObj.length;i++){
		            if(timePeriodObj[i].checked){
		                timePeriod = timePeriodObj[i].value;         
		            }
		        }
		    }
	  	      	
	    	//alert('Add class for students:'+_ncp_selectedStudentObjIdlist);
	    	$.ajax({ url: "http://192.168.0.105:8081/class", type:"PUT", 
		      	dataType:"text", data:{_ids: _ncp_selectedStudentObjIdlist,
		      		classDate: classDate,
		      		duringHour: duringHour,
		      		from: from,
		      		to: to,
		      		timePeriod: timePeriod,
		      		remark: remark	}, success: function(data){ 
		      			//TODO:call snaper notification
		      			console.log('Add class ok, call snaper notification'+data);
		      			//refresh main page data and show notice
		      			
		      			$.mobile.changePage ('#mainpage');
		      			getAllInfo();
		      			$('#mp_addClassDone').click();
		      	 },error:function(err){ 
		     alert('error adding class:'+err); }}); 
    		
    		
    	}
    	
    	function updateClass(){}
    	function removeClass(){}
    	
		  
		  Date.prototype.format = function(format) {  
	    /* 
	     * 使用例子:format="yyyy-MM-dd hh:mm:ss"; 
	     */  
	    var o = {  
	        "M+" : this.getMonth() + 1, // month  
	        "d+" : this.getDate(), // day  
	        "h+" : this.getHours(), // hour  
	        "m+" : this.getMinutes(), // minute  
	        "s+" : this.getSeconds(), // second  
	        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter  
	        "S" : this.getMilliseconds()  
	        // millisecond  
	    }  
	   
	    if (/(y+)/.test(format)) {  
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
	                        - RegExp.$1.length));  
	    }  
	   
	    for (var k in o) {  
	        if (new RegExp("(" + k + ")").test(format)) {  
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1  
	                            ? o[k]  
	                            : ("00" + o[k]).substr(("" + o[k]).length));  
	        }  
	    }  
	    return format;  
	}
		})	

})