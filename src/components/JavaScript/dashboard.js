import Chart from 'chart.js/auto'; 

const ctx = document.getElementById('myChart').getContext('2d');

<<<<<<< HEAD
// Contadores de localidades
let localidadCounters = {
    'RedAntonio Nariño': 0,
    'BlueBarrios Unidos': 0,
    'Bosa': 0,
    'Chapinero': 0,
    'Ciudad Bolívar': 0,
    'Engativá': 0,
    'Fontibón': 0,
    'Kennedy': 0,
    'La Candelaria': 0,
    'Los Mártires': 0,
    'Puente Aranda': 0,
    'Rafael Uribe Uribe': 0,
    'San Cristobal': 0,
    'Santa Fe': 0,
    'Suba': 0,
    'Sumapaz': 0,
    'Teusaqullo': 0,
    'Tunjuelito': 0,
    'Usaquén': 0,
    'Usme': 0
};

const data = {
  labels: Object.keys(localidadCounters),
  datasets: [{
    label: 'Más ventas',
    data: Object.values(localidadCounters),
    backgroundColor: 'rgb(14, 210, 245, 0.4)',
    borderColor: 'rgb(14, 210, 245)',
=======
const data = {
  labels: ['RedAntonio Nariño', 'BlueBarrios Unidos',
   'Bosa', 'Chapinero', 'Ciudad Bolívar', 'Engativá','Fontibón','Kennedy',
   'La Candelaria', 'Los Mártires','Puente Aranda','Rafael Uribe Uribe','San Cristobal','Santa Fe','Suba','Sumapaz',
   'Teusaqullo','Tunjuelito','Usaquén','Usme'],
  datasets: [{
    label: 'Más ventas',
    data: [100, 19, 39, 50, 25, 37,30, 50,70,17,80,45,56,67,43,78,96,56,67,43,],
    backgroundColor: ['rgb(14, 210, 245, 0.4)'],
    borderColor: ['rgb(14, 210, 245)'],
>>>>>>> 13281546d65ff49a7431fe60388de9c0de3ae225
    borderWidth: 1
  }]
};

const chart = new Chart(ctx, {
  type: 'bar',
<<<<<<< HEAD
  data: data
});

// Función para actualizar el gráfico
function updateChart() {
    chart.data.datasets[0].data = Object.values(localidadCounters);
    chart.update();
}

// Obtener formulario
const form = document.getElementById('myForm2');

// Escuchar el evento de envío del formulario
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    
    const formData = new FormData(this); // Obtener datos del formulario
    
    const localidad = formData.get('localidad'); // Obtener la localidad seleccionada
    
    // Incrementar el contador de la localidad seleccionada
    localidadCounters[localidad]++;
    
    // Actualizar el gráfico
    updateChart();
    
    // Aquí iría el código para enviar los datos del formulario a través de la API
=======
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
>>>>>>> 13281546d65ff49a7431fe60388de9c0de3ae225
});
