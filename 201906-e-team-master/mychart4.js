var ctx = document.getElementById("myLineChart"),
    ctxx = ctx.getContext("2d");

var users = [
  {
    "id" : 1,
    "point": 10
  },
  {
    "id" : 2,
    "point": 8
  }
  ]


var choumiryo = [
  {
  "id" : 1,
  "name" : "syouyu",
  "res" : 15,
  "used" : 5,
  "date" : '6月15日',
  "goal" : 2
  },
  {
  "id" : 1,
  "name" : "syouyu",
  "res" : 13,
  "used" : 2,
  "date" : '6月16日',
  "goal" : 2
  },
  {
  "id" : 1,
  "name" : "syouyu",
  "res" : 11,
  "used" : 2,
  "date" : '6月28日',
  "goal" : 2
  },
  {
  "id" : 1,
  "name" : "syouyu",
  "res" : 8,
  "used" : 3,
  "date" : '6月29日',
  "goal" : 2
  },
  {
  "id" : 1,
  "name" : "syouyu",
  "res" : 7,
  "used" : 1,
  "date" : '6月30日',
  "goal" : 2
  },
  {
  "id" : 1,
  "name" : "syouyu",
  "res" : 3,
  "used" : 4,
  "date" : '7月1日',
  "goal" : 2
  },
  {
  "id" : 1,
  "name" : "syouyu",
  "res" : 1,
  "used" : 2,
  "date" : '7月2日',
  "goal" : 2
  } 
];


var dates= [], ress = [], useds = [];
var warns = [], dangers = [];
const maxv = 20;
var warn, danger;
warn = maxv * 0.3
danger = maxv * 0.1
const user_id = 1
var logs = []

for (var i=0; i<choumiryo.length; i++){
  if (choumiryo[i].id == "1" && choumiryo[i].name == "syouyu"){
    logs.push(choumiryo[i])
  }
}

for (var i=0; i < logs.length; i++){
  dates.push(logs[i].date)
  ress.push(logs[i].res)
  useds.push(logs[i].used)
  warns.push(warn)
  dangers.push(danger)
}


var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [
      {
        label: '残量(mg)',
        lineTension: 0,
        data: ress,
        borderColor: "rgba(0,0,255,1)",
        backgroundColor: "rgba(0,0,0,0)"
      },
      {
        label: '使用料(mg)',
        lineTension: 0,
        data: useds,
        borderColor: "rgba(0,255,0,1)",
        backgroundColor: "rgba(0,0,0,0)"
      },
      {
        label: '30%未満',
        lineTension: 0,
        data: warns,
        borderColor: "rgba(255,200,0,1)",
        backgroundColor: "rgba(0,0,0,0)",
        borderDash:[5,5]
      },
      {
        label: '10%未満',
        lineTension: 0,
        data: dangers,
        borderColor: "rgba(255,0,0,1)",
        backgroundColor: "rgba(0,0,0,0)",
        borderDash:[5,5]
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: '残量/使用料'
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMax: maxv,
          suggestedMin: 0,
          stepSize: 2,
          callback: function(value, index, values){
            return  value +  'mg'
          }
        }
      }]
    },
  }
});

if (ress[logs.length-1] > warn){
  document.write("<center>醤油の残量は普通です。</center>".big())
}else if(ress[logs.length-1] < warn && danger < ress[logs.length-1]){
  document.write("<center>醤油の残量が少なくなっています。".big()+"注意".big().fontcolor("orange")+"してください。</center>".big())
}else if(ress[logs.length-1] < danger){
  document.write("<center>醤油の残量は残りわずかです。".big()+"購入".big().fontcolor("red")+"しましょう。</center>".big())
}

var len, used_amount, used_average;
const span = 5
len = String(logs.length)
used_amount = String(ress[0] - ress[logs.length-1])
used_average = String(used_amount / span)
const goal = String(logs[0].goal);


document.write(`<center>目標：1回に${goal}mg</center>`.big())
document.write(`<center>過去${span}回の使用で${used_amount}(mg)使用しました。</center>`.big())
document.write(`<center>結果:1回の使用で${used_average}(mg)使用しました。</center>`.big())

// var form = document.createElement('form');
// var request = document.createElement('input');

// function postForm(value) {
 
//   var form = document.createElement('form');
//   var request = document.createElement('input');

//   form.method = 'POST';
//   form.action = 'https://482fa257.ngrok.io/google-home-notifier';

//   request.type = 'hidden'; //入力フォームが表示されないように
//   request.name = 'text';
//   request.value = value;

//   form.appendChild(request);
//   document.body.appendChild(form);

//   form.submit();

// }
// postForm("しょうゆがありません")

if (used_average <= goal){
  document.write("<center>おめでとうございます!ポイントが付与されました</center>".big())
}else{
  document.write("<center>残念...。また挑戦してください</center>".big())
}


