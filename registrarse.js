document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmarContrasena").value;

    // Expresiones regulares
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    // Validaciones
    if (!regexNombre.test(nombre)) {
      alert("El nombre solo debe contener letras y espacios.");
      return;
    }

    if (!regexNombre.test(apellido)) {
      alert("El apellido solo debe contener letras y espacios.");
      return;
    }

    if (!regexCorreo.test(correo)) {
      alert("El correo electrónico no es válido.");
      return;
    }

    if (!regexContrasena.test(contrasena)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Obtener usuarios existentes
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    // Verificar si el correo ya está registrado
    const usuarioExistente = usuariosRegistrados.find(u => u.correo === correo);

    if (usuarioExistente) {
      alert("Este usuario ya está registrado localmente.");
      return;
    }

    // Guardar nuevo usuario
    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      contrasena // ⚠️ En producción, nunca se guarda en texto plano
    };

    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

    alert("Usuario registrado correctamente");
    form.reset();
  });
});