// modedark.js

document.addEventListener('DOMContentLoaded', () => {
  const darkToggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  // Asegurar que el modo claro esté activo al inicio
  html.classList.remove('dark');
  darkToggle.textContent = '🌙';

  // Evento para alternar modo oscuro
  darkToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    darkToggle.textContent = isDark ? '🌞' : '🌙';
  });
});

