

define(function(){
	
	  require.config({
		    paths : {
		        "jquery" : "libs/jquery/1.10.2/jquery.min",
		        "jquerymobile" : "libs/jquerymobile/1.4.5/jquery.mobile-1.4.5.min"
		        
		    }
		})
		require(["jquery","jquerymobile"],function($){
		  
		  console.log("init start");
    	init();
		  
		  function init(){
    		//Auto search all
      	getAllInfo();
      	//TODO:Process to replace the html dom for the list
      	
      	/* 
      	$.get("http://127.0.0.1:8081/student/",function(data){ alert(data); 
      	$("#myFilter").val(data); } );*/
      }  
      		
      function getAllInfo(){
      	$.ajax({ url: "http://192.168.0.106:8081/student/", type:"GET", 
	      	dataType:"json", context: document.body,success: function(data){ 
	      	//return(data);
	      	 $("#myFilter").val(data.name); 
	      	 },error:function(err){ 
	      	alert(err); }}); 
      	}
      	
    	function updateStudent(){}
    	function removeStudent(){}
    	
    	function addClass(){}
    	function updateClass(){}
    	function removeClass(){}
    	
    	
    	
    	
		  
		})	
    
})