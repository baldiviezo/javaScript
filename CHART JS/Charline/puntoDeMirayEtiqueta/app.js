
const arrayUndefined = [
    { x: '2023-07-01', y: 3 },
    { x: '2023-07-02', y: 6 },
    { x: '2023-07-03', y: 9 },
    { x: '2023-07-04', y: 12 },
    { x: '2023-07-05', y: 15 },
    { x: '2023-07-06', y: 18 },
    { x: '2023-07-07', y: 21 }
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

        if (xHoverCoor && yHoverCoor) {
            //const nearestX = x.getValueForPixel(xHoverCoor);
            const nearestXDate = new Date(data.datasets[0].data[hoverIndex].x); //FALTA .SETHOURS(0,0,0,0)
            //console.log(data.datasets[0].data[hoverIndex]) //datos del eje X y Y
            let pillarThickness = 20;
            let pillarPos = x.getPixelForValue(nearestXDate)- 10;
            /*if(pillarPos < left){
                pillarThickness = 10;
                pillarPos = x.getPixelForValue(nearestXDate);
            }
            if(pillarPos + pillarThickness > right){
                pillarPos = x.getPixelForValue(nearestXDate) - pillarThickness;
                pillarThickness = 10;
            }*/

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fillRect(pillarPos, top , pillarThickness, height ) //posicion de la linea vertical
            ctx.restore();
        }
    },
    //hace que la linea vertical llegue mas abajo.
    afterDatasetsDraw(chart, args, plugins) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

        if (xHoverCoor && yHoverCoor) {
            ctx.save();
            const nearestX = x.getValueForPixel(xHoverCoor);
            const nearestXDate = new Date(data.datasets[0].data[hoverIndex].x);
            const nearestXDate2 = new Date(data.datasets[0].data[hoverIndex].x);
            //cloud
            const yyyymmdd = nearestXDate2.getFullYear() + '-' + nearestXDate2.getMonth() + '-' + nearestXDate2.getDate();
            const textWidth = ctx.measureText(yyyymmdd).width + 20;
            
            let value = x.getPixelForValue(nearestXDate) - (textWidth/2)
            if(value < left){value = left}
            if(value + textWidth > right){value = right - textWidth}
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,26,104,1)';
            ctx.roundRect(value, bottom, textWidth, 20, 4);
            ctx.fill();
            //Text
            let textPos = x.getPixelForValue(nearestXDate);
            if(value === left) {textPos = left +(textWidth/2)}
            if(value === right - textWidth) {textPos = right -(textWidth/2)}

            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = 'white';
            ctx.fillText(yyyymmdd, textPos, bottom + 10)
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
            ctx.roundRect(right, yCorr, hoverTextWidth, 20, 0);
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
        if (args.inChartArea) {
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

            xHoverCoor = args.event.x;
            yHoverCoor = args.event.y;
        } else {
            xHoverCoor = undefined;
            yHoverCoor = undefined;
            hoverIndex = undefined;
        }
        args.changed = true;
    }
}
//staticLabel
const staticLabel = {
    id: 'staticLabel',
    afterDatasetsDraw(chart, args, plugins) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

        ctx.save();
        const lastPoint = data.datasets[0].data.length - 1;
        data.datasets[0].data[lastPoint].y
        //static line
        ctx.beginPath();
        ctx.lineWidth = 2; // Grosor de linea
        ctx.strokeStyle = 'grey';
        ctx.setLineDash([6, 6]); //linea punteada
        ctx.moveTo(left, y.getPixelForValue(data.datasets[0].data[lastPoint].y));
        ctx.lineTo(right, y.getPixelForValue(data.datasets[0].data[lastPoint].y))
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        
        //static bumbble
        const textWidth = ctx.measureText(data.datasets[0].data[lastPoint].y).width + 3;
        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.roundRect(right, y.getPixelForValue(data.datasets[0].data[lastPoint].y) - 8, textWidth, 13, 3)
        ctx.fill();
        //static text
        ctx.font = 'normal 9px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(data.datasets[0].data[lastPoint].y, right + (textWidth / 2), y.getPixelForValue(data.datasets[0].data[lastPoint].y));
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
                position: 'right' //mueve a la derecha la scala del eje y

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
    plugins: [staticLabel, hoverLabel]
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);
