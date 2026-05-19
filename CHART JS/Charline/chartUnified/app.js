//console.log(new Date('2019-01-01'))  //Mon Dec 31 2018 20:00:00 GMT-0400 (Bolivia Time)
//console.log(new Date('2019-01-01').valueOf())  //1546300800000

arrayUndefined = [
    { x: new Date('2023-11-28T15:40:01'), y: 3 },
    { x: new Date('2023-11-28T15:40:02'), y: 6 },
    { x: new Date('2023-11-28T15:40:03'), y: 2 },
    { x: new Date('2023-11-28T15:40:04'), y: 10 },
    { x: new Date('2023-11-28T15:40:05'), y: 15 },
    { x: new Date('2023-11-28T15:40:06'), y: 3 },
    { x: new Date('2023-11-28T15:40:07'), y: 7 }
]

const data = {
    datasets: [{
        data: arrayUndefined,
        label: "Line Uno",
        backgroundColor: [
            'rgba(0, 161, 209, 0.2)'
        ],
        borderColor: [
            'rgba(0, 161, 209, 1)'
        ],
        borderWidth: 1,
    }]
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
        min_x = x.min;
        max_x = x._valueRange;
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
            const_max_x = x._valueRange;
            const_min_y = y.min;
            const_max_y = y._valueRange;

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

const config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    //unit: 'min'  //year,day,hour,min
                }
            },
            y: {
                beginAtZero: true,
                //max: 2
            }
        },
        layout: {
            padding: { //espacio entre la etiqueta  cambas y el grafico
                right: 20,
                bottom: 0,
                left: 20
            }
        },
        animation: false,  //desabilita la animacion de subida
        elements: {
            point: {
                //radius: 0 // ya no muestra los puntos
            }
        },
        interaction: {
            //Al ponde mode: 'index' cuaado tenemos mutiples linea, al poner el mouse sobre sobre una linea nos muestra toda la informacion de todas las lineas que esten encimao abajo del mouse.
            interaction: false,
            mode: 'index'
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
                borderColor: '#94969d',
                borderWidth: 5

            }
        },
        tooltip: {
        }
    },
    plugins: [quadrants, legendMargin],
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);

//position tooltip
Chart.Tooltip.positioners.top = function (elements, eventPosition) {
    const { chartArea: { top }, scales: { x, y } } = this.chart;
    return {
        x: x.getPixelForValue(x.getValueForPixel(eventPosition.x)),
        y: top
    }
}


//Evento click
function clickHandler(click) {
    quadrantZoom(click.offsetX, click.offsetY)
}
myChart.canvas.onclick = clickHandler;

function quadrantZoom(puntoX, puntoY) {
    if (puntoX < const_left || puntoY < const_top || puntoX > const_right || puntoY > const_bottom) {
    } else {
        const { scales: { x, y } } = myChart.config.options;
        if (puntoX < ((const_right + const_left) / 2) && puntoY < ((const_bottom + const_top) / 2)) {
            x.max = max_x / 2 + min_x;
            y.min = max_y / 2 + min_y;
        } else if (puntoX > ((const_right + const_left) / 2) && puntoY < ((const_bottom + const_top) / 2)) {
            x.min = max_x / 2 + min_x;
            y.min = max_y / 2 + min_y;
        } else if (puntoX < ((const_right + const_left) / 2) && puntoY > ((const_bottom + const_top) / 2)) {
            x.max = max_x / 2 + min_x;
            y.max = max_y / 2 + min_y;
        } else if (puntoX > ((const_right + const_left) / 2) && puntoY > ((const_bottom + const_top) / 2)) {
            x.min = max_x / 2 + min_x;
            y.max = max_y / 2 + min_y;
        }
        myChart.update();
    }
}
function resetZoom() {
    console.log('entro')
    const { scales: { x, y } } = myChart.config.options;
    x.min = const_min_x;
    x.max = const_max_x;
    y.min = const_min_y;
    y.max = const_max_y;
    myChart.update();
}
