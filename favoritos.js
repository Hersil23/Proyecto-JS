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
// Agregar estas funciones al final de tu favoritos.js

/** Obtener favoritos del usuario actual */
function getFavoritos() {
  const usuario = getCurrentUser();
  if (!usuario) return [];
  
  const key = `favorites_${usuario.correo}`;  // Usar 'correo' para coincidir con tu estructura
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error parseando favoritos:', e);
    localStorage.removeItem(key);
    return [];
  }
}

/** Obtener usuario actual (adaptado a tu estructura) */
function getCurrentUser() {
  try {
    const raw = localStorage.getItem('usuarioActivo');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error parseando usuarioActivo:', e);
    localStorage.removeItem('usuarioActivo');
    return null;
  }
}

/** Cargar personajes favoritos desde la API */
async function cargarPersonajesFavoritos() {
  const favIds = getFavoritos();
  const characterList = document.getElementById('characterList');
  
  if (favIds.length === 0) {
    characterList.innerHTML = `
      <p class="text-gray-600 dark:text-gray-400 text-lg mt-8">
        No tienes personajes favoritos aún. 
        <a href="./index.html" class="text-blue-500 hover:underline">¡Ve a agregarlos!</a>
      </p>`;
    return;
  }

  // Mostrar loading
  characterList.innerHTML = '<p class="text-gray-600 dark:text-gray-400">Cargando favoritos...</p>';

  try {
    // Obtener personajes por IDs (la API permite múltiples IDs separados por coma)
    const response = await fetch(`https://rickandmortyapi.com/api/character/${favIds.join(',')}`);
    const data = await response.json();
    
    // Si solo hay 1 favorito, la API devuelve un objeto, no un array
    const characters = Array.isArray(data) ? data : [data];
    
    // Renderizar personajes favoritos
    renderFavoritos(characters);
    
  } catch (error) {
    console.error('Error al cargar favoritos:', error);
    characterList.innerHTML = `
      <p class="text-red-500 text-center">
        Error al cargar los personajes favoritos.
      </p>`;
  }
}

/** Renderizar personajes favoritos */
function renderFavoritos(characters) {
  const characterList = document.getElementById('characterList');
  
  characterList.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      ${characters.map(char => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center transition hover:scale-105">
          <img
            src="${char.image}"
            alt="${char.name}"
            class="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h2 class="text-xl font-bold mb-2">${char.name}</h2>
          <p class="text-sm">🧬 Especie: ${char.species}</p>
          <p class="text-sm">❤️ Estado: ${char.status}</p>
          <button 
            type="button"
            class="favorite-btn text-2xl mt-2 cursor-pointer text-red-500"
            data-id="${char.id}"
            onclick="eliminarFavorito(${char.id})"
          >
            🗑️
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

/** Eliminar personaje de favoritos */
function eliminarFavorito(id) {
  const usuario = getCurrentUser();
  if (!usuario) return;
  
  let favs = getFavoritos();
  favs = favs.filter(x => x !== id);
  
  const key = `favorites_${usuario.correo}`;
  localStorage.setItem(key, JSON.stringify(favs));
  
  // Recargar la lista
  cargarPersonajesFavoritos();
}

// Cargar favoritos cuando la página esté lista
if (usuario) {
  cargarPersonajesFavoritos();
}