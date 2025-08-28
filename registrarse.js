document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores del usuario 
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmarContrasena").value;

    // Expresiones regulares que condicionaran lo que el usuario puede ingresar
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    // Validaciones de los valores que ingresa el usuario
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
      contrasena 
    };

    usuariosRegistrados.push(nuevoUsuario); // Añadimos el nuevo usuario al array
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

    alert("Usuario registrado correctamente");
    form.reset();
  });
});