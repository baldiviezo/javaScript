arrayUndefined = [
    { x: new Date('2023-10-28T15:40:00'), y: 3 },
    { x: new Date('2023-10-28T17:40:00'), y: 4 },
    { x: new Date('2023-10-28T19:40:00'), y: 5 },
    { x: new Date('2023-10-28T21:40:00'), y: 6 },
    { x: new Date('2023-10-28T23:40:00'), y: 7 },
    { x: new Date('2023-10-28T23:50:00'), y: 8 },
    { x: new Date('2023-10-28T23:55:00'), y: 9 },
    { x: new Date('2023-10-29T15:40:00'), y: 3 },
    { x: new Date('2023-10-29T17:40:00'), y: 4 },
    { x: new Date('2023-10-29T19:40:00'), y: 5 },
    { x: new Date('2023-10-29T21:40:00'), y: 6 },
    { x: new Date('2023-10-29T23:40:00'), y: 7 },
    { x: new Date('2023-10-29T23:50:00'), y: 8 },
    { x: new Date('2023-10-29T23:55:00'), y: 9 },
    { x: new Date('2023-10-30T15:40:00'), y: 3 },
    { x: new Date('2023-10-30T17:40:00'), y: 4 },
    { x: new Date('2023-10-30T19:40:00'), y: 5 },
    { x: new Date('2023-10-30T21:40:00'), y: 6 },
    { x: new Date('2023-10-30T23:40:00'), y: 7 },
    { x: new Date('2023-10-30T23:50:00'), y: 8 },
    { x: new Date('2023-10-30T23:55:00'), y: 9 },
    { x: new Date('2023-10-31T15:40:00'), y: 3 },
    { x: new Date('2023-10-31T17:40:00'), y: 4 },
    { x: new Date('2023-10-31T19:40:00'), y: 5 },
    { x: new Date('2023-10-31T21:40:00'), y: 6 },
    { x: new Date('2023-10-31T23:40:00'), y: 7 },
    { x: new Date('2023-10-31T23:50:00'), y: 8 },
    { x: new Date('2023-10-31T23:55:00'), y: 9 },
]
const data = {
    datasets: [{
        data: arrayUndefined,
        label: "Nivel",
        borderColor: 'rgba(0,161,209,1)',
        backgroundColor: 'rgba(0,161,209,1)',
        borderWidth: 1,
    }]
}
//hoverLine pluging block
const hoverLine = {
    id: 'hoverLine',
    //para q no se sobreponga dibujar la linea despues de mostra la informacion en un cuadro
    afterDatasetDraw(chart, args, plugins) {
        const { ctx, tooltip, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
        if (tooltip._active.length > 0) { //cuando el mause esta sobre un punto el array ya no esta vacio
            //console.log(args)
            const xCoor = args.meta.data[tooltip.dataPoints[0].dataIndex].x;
            const yCoor = args.meta.data[tooltip.dataPoints[0].dataIndex].y;
            console.log(y.getValueForPixel(yCoor))
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.moveTo(xCoor, top);
            ctx.lineTo(xCoor, bottom);
            ctx.stroke();
            
            //hoverline
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.moveTo(xCoor, yCoor);
            ctx.lineTo(right,yCoor);
            ctx.stroke();
            ctx.closePath();
            //texto
            //hovertext
            ctx.beginPath();
            ctx.fillStyle = 'black';
            //roundRect(x, y, width, height, radii)
            ctx.roundRect(right, yCoor-10, 30, 18, 0);
            ctx.fill();

            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = 'rgba(0,161,209,1)';
            ctx.textAlign = 'center';
            //context.fillText(text, x, y, maxWidth)
            ctx.fillText(y.getValueForPixel(yCoor), right+10, yCoor);

        }
    }
}
//Margen de la legenda
const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart, legend, options) {
        const fitValue = chart.legend.fit;
        chart.legend.fit = function fit() {
            fitValue.bind(chart.legend)();
            return this.height += 20;
        }
    }
}
//labelTooltip
const labelTooltip = (tooltipItems) => {
    return '';
}

//Scala de chart
let min_x, max_x, min_y, max_y;
let const_min_x, const_max_x, const_min_y, const_max_y, const_left, const_right, const_top, const_bottom;
let i = 0;

//Cuadrantes
const quadrants = {
    id: 'quadrants',
    beforeDatasetDraw(chart, args, plugins) {
        const { ctx, chartArea: { left, right, top, bottom, width, height }, scales: { x, y } } = chart; //width = right - left, height = bottom - top
        //valores de cuadrante
        //console.log(x)
        min_x = x.min;
        max_x = x.max;
        min_y = y.min;
        max_y = y._valueRange;
        //console.log(x.min+' '+x._valueRange+' '+y.min+' '+ y._valueRange)
        if (i == 0) {
            i++;
            const_left = left;
            const_right = right;
            const_top = top;
            const_bottom = bottom;
            const_min_x = x.min;
            const_max_x = x.max;
        }
    }
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
            y: {
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
            tooltip: {
                position: 'top', //que apresca arriba
                yAlign: 'buttom', // que la flecha se ponga abajo
                displayColors: false,
                callbacks: {
                    label: labelTooltip
                },
                backgroundColor: 'rgba(31,33,33,1)',
                titleColor: 'rgba(0, 161, 209, 1)',
                titleAlign: 'center',
                //borderColor: '#94969d',
                borderWidth: 5
            },
            zoom:{
                zoom:{
                    wheel:{
                        enabled:true,
                    }
                }
            }

        },
        tooltip: {
        }
    },
    plugins: [quadrants, legendMargin, hoverLine],
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);
//Evento click
function clickHandler(click) {
    quadrantZoom(click.offsetX, click.offsetY)
}
myChart.canvas.onclick = clickHandler;
function quadrantZoom(puntoX, puntoY) {
    if (puntoX < const_left || puntoY < const_top || puntoX > const_right || puntoY > const_bottom) {
    } else {
        const { scales: { x, y } } = myChart.config.options;
        //left
        if (puntoX < ((const_right + const_left) / 2)) {
            x.max = (max_x - min_x) / 2 + min_x;
            console.log(max_x)
            if(x.max-min_x < 86400000){
                myChart.config.options.scales.x.time.unit = 'second';
            }
            
        //right
        } else if (puntoX > ((const_right + const_left) / 2)) {
            x.min = (max_x - min_x) / 2 + min_x;
            if(x.max-min_x < 86400000){
                myChart.config.options.scales.x.time.unit = 'second';
            }
        }
        myChart.update();
    }
}
function resetZoom() {
    const { scales: { x, y } } = myChart.config.options;
    x.min = const_min_x;
    x.max = const_max_x;
    myChart.config.options.scales.x.time.unit = 'day';
    myChart.update();
}
//position tooltip
Chart.Tooltip.positioners.top = function (elements, eventPosition) {
    const { chartArea: { top }, scales: { x, y } } = this.chart;
    return {
        x: x.getPixelForValue(x.getValueForPixel(eventPosition.x)),
        y: top
    }
}
