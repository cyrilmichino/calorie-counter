// Chart.JS Single Gauge chart
function index(perc) {
    return perc < 70 ? 0 : perc < 90 ? 1 : 2;
  }

const value = Utils.rand(MIN, MAX);

const data = {
datasets: [{
    data: [value, 100 - value],
    backgroundColor(ctx) {
    if (ctx.type !== 'data') {
        return;
    }
    if (ctx.index === 1) {
        return 'rgb(234, 234, 234)';
    }
    return COLORS[index(ctx.raw)];
    }
}]
};

const annotation = {
    type: 'doughnutLabel',
    content: ({chart}) => [
        chart.data.datasets[0].data[0].toFixed(2) + ' %',
        'CPU utilization',
    ],
    drawTime: 'beforeDraw',
    position: {
        y: '-50%'
    },
    font: [{size: 50, weight: 'bold'}, {size: 20}],
    color: ({chart}) => [COLORS[index(chart.data.datasets[0].data[0])], 'grey']
    };

const config = {
    type: 'doughnut',
    data,
    options: {
      aspectRatio: 2,
      circumference: 180,
      rotation: -90,
      plugins: {
        annotation: {
          annotations: {
            annotation
          }
        }
      }
    }
  };