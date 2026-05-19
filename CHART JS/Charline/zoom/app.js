//console.log(new Date('2019-01-01'))  //Mon Dec 31 2018 20:00:00 GMT-0400 (Bolivia Time)
//console.log(new Date('2019-01-01').valueOf())  //1546300800000

const abscisa = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ordenadaUno = [18, 12, 6, 9, 12, 3, 9, 15, 1, 6];
const ordenadaDos = [18, 16, 2, 3, 15, 8, 6, 17, 9, 6];
const data = {
    labels: abscisa,
    datasets: [{
        data: ordenadaUno,
        label: "Line Uno",
        backgroundColor: [
            'rgba(255, 26, 104, 0.2)'
        ],
        borderColor: [
            'rgba(255, 26, 104, 1)'
        ],
        borderWidth: 1,
    }, {
        data: ordenadaDos,
        label: "Line Dos",
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)'
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
const config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
                //min: 0
            },
            y: {
                beginAtZero: true,
                //max: 2
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
            //Al ponde mode: 'index' cuaado tenemos mutiples linea, al poner el mouse sobre sobre una linea nos muestra toda la informacion de todas las lineas que esten encimao abajo del mouse.
            interaction: false,
            mode: 'index'
        }
    },
    plugins: [quadrants],
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
