
const ctx = document.getElementById('myChart').getContext('2d');

const data = {
  labels: ['RedAntonio Nariño', 'BlueBarrios Unidos',
   'Bosa', 'Chapinero', 'Ciudad Bolívar', 'Engativá','Fontibón','Kennedy',
   'La Candelaria', 'Los Mártires','Puente Aranda','Rafael Uribe Uribe','San Cristobal','Santa Fe','Suba','Sumapaz',
   'Teusaqullo','Tunjuelito','Usaquén','Usme'],
  datasets: [{
    label: 'Más ventas',
    data: [12, 19, 39, 50, 25, 37,30, 50,70,17,80,45,56,67,43,78,96,56,67,43,],
    backgroundColor: ['rgb(14, 210, 245, 0.4)'],
    borderColor: ['rgb(14, 210, 245)'],
    borderWidth: 1
  }]
};

const chart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
    onClick: (e) => {
      const canvasPosition = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)[0];
      if (canvasPosition) {
        const dataX = chart.data.labels[canvasPosition.index];
        const dataY = chart.data.datasets[canvasPosition.datasetIndex].data[canvasPosition.index];
        console.log(dataX, dataY);
      }
    }
  }
});
 