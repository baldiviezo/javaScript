const abscisa = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ordenadaUno = [18, 12, 6, 9, 12, 3, 9];
const ordenadaDos = [18, 16, 2, 3, 15, 8, 6];
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
        order: 1
    },
    {
        data: ordenadaDos,
        label: "Line Dos",
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
        order: 0
     
    }]
}
const config = {
    type: 'line',
    data,
    options: {
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
                radius: 0 // default to disabled in all datasets
            }
        }
    }
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);

console.log(new Date('2019-01-01'))  //Mon Dec 31 2018 20:00:00 GMT-0400 (Bolivia Time)
console.log(new Date('2019-01-01').valueOf())  //1546300800000