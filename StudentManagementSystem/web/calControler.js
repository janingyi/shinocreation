// Call this from the developer console and you can control both instances
var calendars = {};

$(document).ready( function() {

    // Assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.
    // moment.locale('ru');

				$("#backSMSBtn").bind("click",function(){
				   /*$.mobile.changePage("index.html",
           { transition: "slideup" });*/
           window.location.href = "shinocreation.html";
				});

    // Here's some magic to make sure the dates are happening this month.
    var thisMonth = moment().format('YYYY-MM');
    // Events to load into calendar
    var eventArray = [
        {
            title: 'Multi-Day Event',
            endDate: thisMonth + '-14',
            startDate: thisMonth + '-10'
        }, {
            endDate: thisMonth + '-23',
            startDate: thisMonth + '-21',
            title: 'Another Multi-Day Event'
        }, {
            date: thisMonth + '-27',
            title: 'Single Day Event'
        }
    ];
		initCalendar();
    // The order of the click handlers is predictable. Direct click action
    // callbacks come first: click, nextMonth, previousMonth, nextYear,
    // previousYear, nextInterval, previousInterval, or today. Then
    // onMonthChange (if the month changed), inIntervalChange if the interval
    // has changed, and finally onYearChange (if the year changed).
    calendars.clndr1; 

    /* Calendar 2 uses a custom length of time: 2 weeks paging 7 days
    calendars.clndr2 = $('.cal2').clndr({
        lengthOfTime: {
            days: 14,
            interval: 7
        },
        events: eventArray,
        multiDayEvents: {
            singleDay: 'date',
            endDate: 'endDate',
            startDate: 'startDate'
        },
        template: $('#template-calendar').html(),
        clickEvents: {
            click: function (target) {
                console.log('Cal-2 clicked: ', target);
            },
            nextInterval: function () {
                console.log('Cal-2 next interval');
            },
            previousInterval: function () {
                console.log('Cal-2 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-2 interval changed');
            }
        }
    });
*/
    /* Calendar 3 renders two months at a time, paging 1 month
    calendars.clndr3 = $('.cal3').clndr({
        lengthOfTime: {
            months: 2,
            interval: 1
        },
        events: eventArray,
        multiDayEvents: {
            endDate: 'endDate',
            startDate: 'startDate'
        },
        clickEvents: {
            click: function (target) {
                console.log('Cal-3 clicked: ', target);
            },
            nextInterval: function () {
                console.log('Cal-3 next interval');
            },
            previousInterval: function () {
                console.log('Cal-3 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-3 interval changed');
            }
        },
        template: $('#template-calendar-months').html()
    });*/

    // Bind all clndrs to the left and right arrow keys
    $(document).keydown( function(e) {
        // Left arrow
        if (e.keyCode == 37) {
            calendars.clndr1.back();
        }

        // Right arrow
        if (e.keyCode == 39) {
            calendars.clndr1.forward();
        }
    });
    
    function initCalendar () {
    	
    	$.ajax({ url: "http://192.168.0.105:8081/student", type:"GET", 
		      	dataType:"json", context: document.body,success: function(data){
		      		 //save to global context
		      		 //alert(data);
		      		  var _fullData = data;
		      		  
		  var studentLen = _fullData.length;
    	var classLen = 0;
    	var eventArray=[];//clean data
    	var onClickData=[];
    	var studentNameListStr='';
    	var eventMap={};
    	var tempStuNameList = '';
    	var tempClassDate;
    	console.log("studentLen:"+studentLen);
    	for(i=0; i<studentLen; i++){
    				classLen = _fullData[i].class.length;
    				console.log("classLen:"+classLen);
      			for(j=0; j<classLen; j++){
      				//1 - set student name as map to avoid duplicate, only 1 time for one student
      				
      				//2 - set date, get student list by date and append
      				tempStuNameList = '';//clean
      				tempClassDate=_fullData[i].class[j].classDate.substr(0,10);
      				tempStuNameList = eventMap[tempClassDate];//todo map
      				console.log("1tempClassDate:"+tempClassDate+" -tempStuNameList:"+tempStuNameList);
      				if(!tempStuNameList){
      					tempStuNameList = '';
      				}
              //todo map
              tempStuNameList = tempStuNameList + _fullData[i].fullName + '; '//TODO append all the class info in the title for on click event display
              console.log("2tempClassDate:"+tempClassDate+" -tempStuNameList:"+tempStuNameList);
              eventMap[tempClassDate] = tempStuNameList;
              
      				
              /*
      				_fullData[i].class[j].timePeriod
      				classDate.substr(0,10);
      				duringHour
      				from
      				to
      				remark
      				*/
      			}
      			
      }
      var eventMapLen = eventMap.length;
      for (var classDate in eventMap) {
      	//console.log("1:"+classDate+" - 2:");
      	 eventArray.push({date:classDate,title:eventMap[classDate]});
      }
      
		      		 calendars.clndr1=$('.cal1').clndr({
		      		 			
						        events: eventArray,
						        clickEvents: {
						            click: function (target) {
						                console.log('Cal-1 clicked: ', target);
						                if (target.events[0]) {
						                		$('#classDetail').html(target.events[0].date +':'+ target.events[0].title);	
						                		$('#classDetail').css("background", "#9F9DE8");
						                }else {
						                	  $('#classDetail').html(target.date._i +':'+ 'No class record for this day!');	
						                	  $('#classDetail').css("background", "#C0C0C0");
						                }
						                
						            },
						            today: function () {
						                console.log('Cal-1 today');
						                alert("today");
						            },
						            nextMonth: function () {
						                console.log('Cal-1 next month');
						            },
						            previousMonth: function () {
						                console.log('Cal-1 previous month');
						            },
						            onMonthChange: function () {
						                console.log('Cal-1 month changed');
						            },
						            nextYear: function () {
						                console.log('Cal-1 next year');
						            },
						            previousYear: function () {
						                console.log('Cal-1 previous year');
						            },
						            onYearChange: function () {
						                console.log('Cal-1 year changed');
						            },
						            nextInterval: function () {
						                console.log('Cal-1 next interval');
						            },
						            previousInterval: function () {
						                console.log('Cal-1 previous interval');
						            },
						            onIntervalChange: function () {
						                console.log('Cal-1 interval changed');
						            }
						        },
						        multiDayEvents: {
						            singleDay: 'date',
						            endDate: 'endDate',
						            startDate: 'startDate'
						        },
						        showAdjacentMonths: true,
						        adjacentDaysChangeMonth: false
						    });
		      	 },error:function(err){ 
		      			alert(err); }}); 
		}
	
});