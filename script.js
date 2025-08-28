document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle'); // Botón de menú
    const mobileMenu = document.getElementById('mobileMenu'); // Menú móvil

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => { // creamos el evento click para el botón de menú
        mobileMenu.classList.toggle('hidden'); // mostramos u ocultamos el menú
      });

      // Opcional: cerrar el menú al hacer clic fuera de él
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) { // cerramos el menú si se hace clic fuera de él
          mobileMenu.classList.add('hidden'); // ocultamos el menú
        }
      });
    }
  });