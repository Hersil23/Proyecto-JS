// favoritos.js

function verificarSesionIniciada() {
  const usuarioJSON = localStorage.getItem("usuarioActivo");

  if (!usuarioJSON) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.replace("iniciar.html"); // 👈 reemplaza el historial
    return null;
  }

  try {
    const usuario = JSON.parse(usuarioJSON);

    // Validación extra: asegurarse de que tenga nombre y correo
    if (!usuario.nombre || !usuario.correo) {
      throw new Error("Usuario inválido");
    }

    return usuario;
  } catch (error) {
    console.error("Error al leer usuarioActivo:", error);
    localStorage.removeItem("usuarioActivo"); // Limpieza preventiva
    window.location.replace("iniciar.html");
    return null;
  }
}

// Ejecutar validación al cargar la página
const usuario = verificarSesionIniciada();

if (usuario) {
  console.log("Usuario activo:", usuario.nombre);

  // Mostrar saludo personalizado
  const saludo = document.getElementById("saludoUsuario");
  if (saludo) {
    saludo.textContent = `¡Bienvenido a tu sección de personajes Favoritos, ${usuario.nombre}!`;
  }

  // Aquí puedes seguir con el resto de la lógica de favoritos
}