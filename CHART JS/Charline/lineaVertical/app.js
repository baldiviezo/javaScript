arrayUndefined = [
    {x: new Date('2023-10-28T15:40:00'), y: 3},
    {x: new Date('2023-10-28T17:40:00'), y: 4},
    {x: new Date('2023-10-28T19:40:00'), y: 5},
    {x: new Date('2023-10-28T21:40:00'), y: 6},
    {x: new Date('2023-10-28T23:40:00'), y: 7},
    {x: new Date('2023-10-28T23:50:00'), y: 8},
    {x: new Date('2023-10-28T23:55:00'), y: 9},
    {x: new Date('2023-10-29T15:40:00'), y: 3},
    {x: new Date('2023-10-29T17:40:00'), y: 4},
    {x: new Date('2023-10-29T19:40:00'), y: 5},
    {x: new Date('2023-10-29T21:40:00'), y: 6},
    {x: new Date('2023-10-29T23:40:00'), y: 7},
    {x: new Date('2023-10-29T23:50:00'), y: 8},
    {x: new Date('2023-10-29T23:55:00'), y: 9},
    {x: new Date('2023-10-30T15:40:00'), y: 3},
    {x: new Date('2023-10-30T17:40:00'), y: 4},
    {x: new Date('2023-10-30T19:40:00'), y: 5},
    {x: new Date('2023-10-30T21:40:00'), y: 6},
    {x: new Date('2023-10-30T23:40:00'), y: 7},
    {x: new Date('2023-10-30T23:50:00'), y: 8},
    {x: new Date('2023-10-30T23:55:00'), y: 9},
    {x: new Date('2023-10-31T15:40:00'), y: 3},
    {x: new Date('2023-10-31T17:40:00'), y: 4},
    {x: new Date('2023-10-31T19:40:00'), y: 5},
    {x: new Date('2023-10-31T21:40:00'), y: 6},
    {x: new Date('2023-10-31T23:40:00'), y: 7},
    {x: new Date('2023-10-31T23:50:00'), y: 8},
    {x: new Date('2023-10-31T23:55:00'), y: 9},
]
//hoverLine pluging block
const hoverLine = {
    id: 'hoverLine',
    //para q no se sobreponga dibujar la linea despues de mostra la informacion en un cuadro
    afterDatasetDraw(chart, args, plugins){
        const { ctx, tooltip, chartArea: {top, bottom, left, right, width, height}, scales: {x, y}} = chart;
        if(tooltip._active.length > 0){ //cuando el mause esta sobre un punto el array ya no esta vacio
            console.log(args)
            const xCoor = args.meta.data[tooltip.dataPoints[0].dataIndex].x;
            const yCoor = tooltip.dataPoints[0].parsed.y;
            console.log( )
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.moveTo(xCoor, top);
            ctx.lineTo(xCoor, bottom);
            ctx.stroke();
            ctx.closePath();
        }
    }
}
const data = {
    datasets: [{
        data: arrayUndefined,
        label: "Nivel",
        borderColor: 'rgba(0,161,209,1)',
        backgroundColor: 'rgba(0,161,209,1)',
        borderWidth: 1,
     
    }]
}
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
        },
        interaction: {
            interaction: false,
        },
        plugins: {
            legend: {
                align: 'start' //La legenda empieza desde la izquierda
            },
        },
       
    },
    plugins: [hoverLine],
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);

