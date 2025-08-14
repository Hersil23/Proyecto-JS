document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value;

    // Expresiones regulares
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    // Validaciones
    if (!regexCorreo.test(correo)) {
      alert("El correo electrónico no es válido.");
      return;
    }

    if (!regexContrasena.test(contrasena)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
      return;
    }

    // Obtener usuarios registrados
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    // Buscar usuario
    const usuario = usuariosRegistrados.find(u => u.correo === correo);

    if (!usuario) {
      alert("Este usuario no se encuentra registrado. Por favor regístrate.");
      return;
    }

    if (usuario.contrasena !== contrasena) {
      alert("La contraseña es incorrecta.");
      return;
    }

    // Guardar sesión (puedes usar localStorage o sessionStorage)
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    console.log("Sesión iniciada por:", usuario);

    alert("Inicio de sesión exitoso");
    window.location.href = "favoritos.html";
  });
});