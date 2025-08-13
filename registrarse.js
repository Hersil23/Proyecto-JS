document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById("confirmarContrasena").value;

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contrasenaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!nombreRegex.test(nombre)) {
    alert("Por favor ingresa un nombre válido (solo letras).");
    return;
  }

  if (!nombreRegex.test(apellido)) {
    alert("Por favor ingresa un apellido válido (solo letras).");
    return;
  }

  if (!correoRegex.test(correo)) {
    alert("Por favor ingresa un correo electrónico válido.");
    return;
  }

  if (!contrasenaRegex.test(contrasena)) {
    alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
    return;
  }

  if (contrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Guardar en localStorage
  const usuario = {
    nombre,
    apellido,
    correo,
    contrasena
  };

  localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

  alert("¡Te has registrado correctamente! Ahora puedes iniciar sesión.");
  window.location.href = "iniciar.html";
});