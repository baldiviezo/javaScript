const abscisa = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ordenada = [2, 4, 6, 8, 10, 12, 14, 16, 18];
const data = {
    labels: abscisa,
    datasets: [{
        data: ordenada,
        label: "Nivel",
        borderColor: 'rgba(182,207,118,1)',
        borderWidth: 1,
     
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