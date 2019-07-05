var data = [
  {
    name:"醤油",
    nokori:50,
    kousin:new Date(2019,5,30,0)
  },
  {
    name:"塩",
    nokori:5,
    kousin:new Date(2019,5,29,0)
  },
  {
    name:"砂糖",
    nokori:25,
    kousin:new Date(2019,5,10,0)
  },
  {
    name:"酢",
    nokori:60,
    kousin:new Date(2019,5,30,0)
  }
]

var loading = true;

var user;


function setValue(index,value){
  document.getElementById("value"+index).innerHTML = "残量:"+value+"%";
  if(value<10){
    document.getElementById("value"+index).style.color = "#ff0000";
  }
  else if(value<30){
    document.getElementById("value"+index).style.color = "#ff8800";
  }
}

function setSpeed(index,date){
  document.getElementById("kousin"+index).innerHTML = "最終使用:"+dateToText(date,1);
  /*if(speed>10){
    document.getElementById("speed"+index).style.color = "#ff0000";
  }else if(speed>5){
    document.getElementById("speed"+index).style.color = "#ff8800";
  }*/
}

function init(){
  //getData();
  //while(loading);
  createMenu();
  createChart();
}

function createMenu(){
  document.getElementById("menu").innerHTML="";
  for(var i = 0;i<data.length;i++){
    document.getElementById("menu").insertAdjacentHTML("beforeEnd",
      '<div  id = "test" class = "box1">'+
        '<p>'+
          '<h5>'+data[i].name+'</h5>'+
          '<div id="message">'+
          '<span id= "value'+i+'" >残量:50%</span></br>'+
        //  '<input type = "button" value= "'+data[i].name+'" onclick = "setSpeed('+i+')"></input>'+
          '<span id = "kousin'+i+'">最終使用:</span></br>'+
          '<input type = "button" value= "詳細を見る" onclick = "openURL('+i+')"></input></br>'+
          '</div>'+
          '<div id = "chart">'+
          '<canvas id="chart'+i+'"></canvas>'+
          '</div>'+
        '</p>'+
      '</div>');
      setValue(i,data[i].nokori);
      setSpeed(i,data[i].kousin);//ここ計算する
  }
}

function createChart(){
  for(var i=0;i<data.length;i++){
    var ctx = document.getElementById("chart"+i);
    var chart = new Chart(ctx,{
      type:"bar",
      data:{
        label:[data[i].name],
        datasets:[{
          data:[data[i].nokori],
          backgroundColor:getColor(data[i].nokori)
        }]
      },
      options:{
        title:{
          display:false
        },
        legend:{
          display:false
        },
        responsive:true,
        maintainAspectRatio: false,
        scales:{
          yAxes:[{
            ticks:{
              max:100,
              min:0,
              stepSize:20
            }
          }]
        }
      }
    })
  }
}

function getColor(value){
  if(value>30){
    return "rgba(0,255,0,0.8)";
  }else if(value >10){
    return "rgba(255,255,0,1)";
  }else{
    return "rgba(255,0,0,0.8)";
  }
}

/*function addmenu(name){
  var name = document.getElementById("name").value;
  var size = ($('#menu div').length) +1;
document.getElementById("menu").insertAdjacentHTML("beforeEnd",
  '<div  id = "test1" class = "box1">'+
    '<p>'+
      '<input type = "button" value= "'+name+'" onclick = "setValue('+size+')"></input>'+
      '<a id= "value'+size+'" >残量:50%</a></br>'+
      '<input type = "button" value= "'+name+'" onclick = "setSpeed('+size+')"></input>'+
      '<a id = "speed'+size+'">平均使用速度:5%/day</a></br>'+
    '</p>'+
  '</div>');
}*/

function getData(){
  $.ajax({
    url:"http://18.221.70.230:8080",
    data:data2={}, //= {
    //  user:user
    //},
    success:function(data2){
      console.log(data2);
//      data = data2;
      loading = false;
    }
  })
/*  var request = new XMLHttpRequest();
  request.open('GET',"http://18.221.70.230:8080",true);
  request.onload = function(){
    var data2 = this.response;
    console.log(data2);
  };
  request.send();*/
}

function getParams(url) {
	var paramKvs = new Object();
	if (url.indexOf("?") != -1) {
		//キーバリューに分解して，dateを探す
		var params = url.split("?")[1].split("&");
		for (var i=0; i<params.length; i++) {
			var kv = params[i].split("=");
			paramKvs[kv[0]] = kv[1];
		}
	}
	return paramKvs;
}

function openURL(i){
  location.href = "./js/chart.js?name="+data[i].name;
}

function dateToText(date,end){
  var datetext,timetext;
  datetext = date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).slice(-2) + '-' + ('0'+date.getDate()).slice(-2);
  timetext = ('0'+date.getHours()).slice(-2) + ':' + ('0'+date.getMinutes()).slice(-2) + ':' + ('0'+date.getSeconds()).slice(-2);
  if(end>0){
    return datetext;
  }else if(end == 0){
    return datetext + ' ' + timetext;
  }else{
    return timetext;
  }
}
