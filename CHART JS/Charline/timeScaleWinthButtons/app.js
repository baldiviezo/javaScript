//console.log(new Date('2019-01-01'))  //Mon Dec 31 2018 20:00:00 GMT-0400 (Bolivia Time)
//console.log(new Date('2019-01-01').valueOf())  //1546300800000

arrayUndefined = [
    {x: new Date('2023-11-28T15:40:00'), y: 3},
    {x: new Date('2023-11-28T17:40:00'), y: 4},
    {x: new Date('2023-11-28T19:40:00'), y: 5},
    {x: new Date('2023-11-28T21:40:00'), y: 6},
    {x: new Date('2023-11-28T23:40:00'), y: 7},
    {x: new Date('2023-11-29T01:40:00'), y: 8},
    {x: new Date('2023-11-29T03:40:00'), y: 9}
]
const data = {
    datasets: [{
        data: arrayUndefined,
        label: "Nivel",
        borderColor: 'rgba(182,207,118,1)',
        borderWidth: 1,
    }]
}
console.log(data)
const config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'  //year,day,hour,min
                }
            },
            y:{
                //beginAtZero: true
            }
        },
        layout: {
            padding: { //espacio entre la etiqueta  cambas y el grafico
                top: 10,
                right: 20,
                bottom: 0,
                left: 20
            }
        },
        animation: false,  //desabilita la animacion de subida
        elements: {
            point: {
                radius: 0 // ya no muestra los puntos
            }
        }
    }
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);

function dateFilter(time){
    myChart.config.options.scales.x.time.unit = time;
    myChart.update();
}