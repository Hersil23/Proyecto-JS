// favoritos.js

function verificarSesionIniciada() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "iniciar.html";
    return null;
  }

  return usuarioActivo;
}

// Ejecutar validación al cargar la página
const usuario = verificarSesionIniciada();

if (usuario) {
  console.log("Usuario activo:", usuario.nombre);

  // Mostrar saludo personalizado
  const saludo = document.getElementById("saludoUsuario");
  if (saludo) {
    saludo.textContent = `¡Hola, ${usuario.nombre}!`;
  }

  // Aquí puedes seguir con el resto de la lógica de favoritos
}