function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(  );
    return xmlHttp.responseText;
}

//data=httpGet("http://localhost:8000/data.json")
data=httpGet("http://localhost:5000/getStock/GOOGL")
data=JSON.parse(data)
dati=data.dati
forecast=data.forecast
console.log(data)

x=[]
y=[]
x2=[]
y2=[]
for (var i=0;i<forecast.length;i++){
    // date=new Date(forecast[i][0])
    // mese=date.getMonth()+1
    // if (mese<10){
    //     mettizero=true
    // }
    // if(mettizero==true){
    //     stringa=""+date.getFullYear()+"-0"+date.getMonth()+1+"-"+date.getDay()
    
    // }else{
    //     stringa=""+date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDay()
    
    // }
    x2.push(forecast[i][0])
    //x2.push(stringa)
    y2.push(forecast[i][1])
}
for (var i=0;i<dati.length;i++){
    x.push(dati[i][0])
    y.push(dati[i][1])
}
console.log(y)
prova={"x":x,"y":y,"type":"scatter"}

var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'normal',
    x: x,
    y: y,
    line: {color: '#17BECF'}
  }
  
  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'predicted',
    x: x2,
    y: y2,
    line: {color: '#7F7F7F'}
  }
valori=[trace1,trace2]
var layout = {
    title: 'Basic Time Series',
  };

var layout2 = {
title: 'Time Series with Rangeslider',
xaxis: {
    autorange: true,
    range: ['2015-02-17', '2017-02-16'],
    rangeselector: {buttons: [
        {
        count: 1,
        label: '1m',
        step: 'month',
        stepmode: 'backward'
        },
        {
        count: 6,
        label: '6m',
        step: 'month',
        stepmode: 'backward'
        },
        {step: 'all'}
    ]},
    rangeslider: {range: ['2015-02-17', '2017-02-16']},
    type: 'date'
},
yaxis: {
    autorange: true,
    range: [86.8700008333, 138.870004167],
    type: 'linear'
}
};
  
tester = document.getElementById('tester');
//Plotly.newPlot("tester", [prova]);
Plotly.newPlot('tester',valori,layout)
