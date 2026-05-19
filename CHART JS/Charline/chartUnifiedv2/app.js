
const arrayUndefined = [
    { x: '2023-07-01', y: 3 },
    { x: '2023-07-02', y: 6 },
    { x: '2023-07-03', y: 9 },
    { x: '2023-07-04', y: 12 },
    { x: '2023-07-05', y: 15 },
    { x: '2023-07-06', y: 18 },
    { x: '2023-07-07', y: 21 },
    { x: '2023-07-08', y: 18 },
    { x: '2023-07-09', y: 15 },
    { x: '2023-07-10', y: 19 },
    { x: '2023-07-11', y: 1 },
    { x: '2023-07-12', y: 13},
    { x: '2023-07-13', y: 8 },
];
const data = {
    datasets: [{
        data: arrayUndefined,
        label: "Nivel",
        borderColor: 'rgba(182,207,118,1)',
        borderWidth: 1,
    }]
}
//hoverLabel
let xHoverCoor;
let yHoverCoor;
let hoverIndex; //cordenada x del punto
//para la linea vertical
const hoverLabel = {
    id: 'hoverLabel',
    beforeDatasetsDraw(chart, args, plugins) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

        if (xHoverCoor && yHoverCoor && hoverIndex) {
            
            const nearestX = x.getValueForPixel(xHoverCoor); //valor mas cercano al punto x
            //const nearestXDate = new Date(nearestX).setHours(0,0,0,0)//lo convierte nuevamente en fecha
            const nearestXDate = new Date(nearestX).setHours(0,0,0,0)
            //console.log(hoverIndex) //toma un punto del eje x
            //console.log(data.datasets[0].data[hoverIndex].x) // muestra la fecha de ese eje x
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0,0,0,1)';
            //fillRect(x,y,w,h)
            ctx.fillRect(x.getPixelForValue(nearestXDate), top , 1, height ) //posicion de la linea vertical
            ctx.restore();
        }
    },
    //hace que la linea vertical llegue mas abajo.
    afterDatasetsDraw(chart, args, plugins) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

        if (xHoverCoor && yHoverCoor && hoverIndex) {
            ctx.save();
            const nearestX = x.getValueForPixel(xHoverCoor); //valor mas cercano al punto x
            const nearestXDate = new Date(data.datasets[0].data[hoverIndex].x)//lo convierte nuevamente en fecha
            const nearestXDate2 = new Date(nearestX);
            //cloud
            const yyyymmdd = nearestXDate2.getFullYear() + '-' + nearestXDate2.getMonth() + '-' + nearestXDate2.getDate();
            const textWidth = ctx.measureText(yyyymmdd).width+20;

            ctx.beginPath();
            ctx.fillStyle = 'rgba(31,33,33,1)';
            //roundRect(x,y,w,h,r)
            ctx.roundRect(x.getPixelForValue(nearestX) - (textWidth/2), top, textWidth, 20, 4);
            ctx.fill();
            
            //Text
            ctx.font = 'bold 9px sans-serif';
            ctx.fillStyle = 'rgba(0, 161, 209, 1)';
            ctx.fillText(yyyymmdd, x.getPixelForValue(nearestX), top+10)

            //hoverline
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.setLineDash([3,3]);
            ctx.moveTo(left, y.getPixelForValue(data.datasets[0].data[hoverIndex].y));
            ctx.lineTo(right, y.getPixelForValue(data.datasets[0].data[hoverIndex].y));
            ctx.stroke();
            ctx.setLineDash([]);
            //hoverCloud
            const hoverTextWidth = ctx.measureText(data.datasets[0].data[hoverIndex].y).width + 3;
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.roundRect(right, y.getPixelForValue(data.datasets[0].data[hoverIndex].y) -10, hoverTextWidth, 20, 4);
            ctx.fill();

            //hovertext
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(data.datasets[0].data[hoverIndex].y, right + (hoverTextWidth/2), y.getPixelForValue(data.datasets[0].data[hoverIndex].y));

        }
    },
    //Agarre el punto x mas cercano al mouse
    afterEvent(chart, args) {
        const { ctx, canvas, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
        if (args.inChartArea) { //args.inChartArea nos da la informacion de las cordenadas del mouse dentro del area de grafico
            canvas.addEventListener('mousemove', (e) => {
                nearestValue(chart, e);
            })
            function nearestValue(chart, mousemove) {
                const points = chart.getElementsAtEventForMode(
                    mousemove, 'nearest', { intersect: false }, true)
                if (points.length) {
                    hoverIndex = points[0].index;
                }
            }
            xHoverCoor = args.event.x; //cordenadas del mouse dentro del area del grafico
            yHoverCoor = args.event.y; //cordenadas del mouse dentro del area del grafico
        } else {
            xHoverCoor = undefined;
            yHoverCoor = undefined;
            hoverIndex = undefined;
        }
        args.changed = true;
    }
}

//config
const config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: true,
                //position: 'right' //mueve a la derecha la scala del eje y

            }
        },
        layout: {
            padding: {
                top: 0,
                right: 20,
                bottom: 0,
                left: 20
            }
        },
        animation: false,
        elements: {
            point: {
                //radius: 0 // default to disabled in all datasets
            }
        }
    },
    plugins: [hoverLabel]
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);
