//src/pages/api/methods.json.ts

document.addEventListener('DOMContentLoaded', () => {
  const editButtons = document.querySelectorAll('button.btnEditar');
  const deleteButtons = document.querySelectorAll('button.btnBorrar');

  editButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = button.closest('tr')?.dataset.userId;
      const newName = prompt("Ingrese el nuevo nombre:");
      if (newName && userId) {
        try {
          const response = await fetch('src/pages/api/eliminarUser.ts', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId, name: newName }),
          });
          const result = await response.json();
          console.log('PUT response:', result);
          alert(result.message);
          if (response.ok) {
            location.reload();
          }
        } catch (error) {
          console.error('Error in PUT request:', error);
          alert('Failed to update user');
        }
      }
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = button.closest('tr')?.dataset.userId;
      if (userId) {
        try {
          const response = await fetch('src/pages/api/actualizar.ts', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
          });
          const result = await response.json();
          console.log('DELETE response:', result);
          alert(result.message);
          if (response.ok) {
            location.reload();
          }
        } catch (error) {
          console.error('Error in DELETE request:', error);
          alert('Failed to delete user');
        }
      }
    });
  });
});
