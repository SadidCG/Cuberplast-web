import Chart from 'chart.js/auto'; 

const ctx = document.getElementById('myChart').getContext('2d');

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
    borderWidth: 1
  }]
};

const chart = new Chart(ctx, {
  type: 'bar',
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
});
