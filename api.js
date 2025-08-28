// 1. Contenedores en el DOM
const container           = document.getElementById('characterContainer'); 
const paginationContainer = document.getElementById('pagination');

const apiUrl      = 'https://rickandmortyapi.com/api/character';
let currentPage   = 1;

/** 2. Leer usuario actual desde LocalStorage*/
function getCurrentUser() {
  try {
    const raw = localStorage.getItem('usuarioActivo'); // declaramos la variable 'raw' para obtener el usuario activo
    return raw ? JSON.parse(raw) : null; // retornamos el usuario activo o null
  } catch (e) {// manejamos el error
    console.error('Error parseando usuarioActivo:', e);// se muestra error si llega a ocurrir
    localStorage.removeItem('usuarioActivo');// eliminamos el item en caso de error en el localStorage
    return null;
  }
}

/** 3. Generar clave de favoritos*/
function getFavKey() {
  const user = getCurrentUser();
  return user ? `favorites_${user.correo}` : null; // Cambiado de 'user.email' a 'user.correo'
}

/** 4. Leer o cargar el array de favoritos */
function getFavorites() {
  const key = getFavKey(); 
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);// declaramos la variable 'raw' para obtener el arreglo de favoritos
    return raw ? JSON.parse(raw) : []; // Retornamos el arreglo de favoritos o un arreglo vacío
  } catch (e) {// manejamos el error
    console.error('Error parseando favoritos:', e);
    localStorage.removeItem(key);
    return [];
  }
}

/** 5. Guardar el array de favoritos */
function saveFavorites(arr) {
  const key = getFavKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(arr));
}

/** 6. Verificar si un personaje está incluido en favoritos */
function isFavorite(id) {
  return getFavorites().includes(id);
}

/** 7. Manejador o función de click en la estrella para seleccionar un personaje */
function onFavoriteClick(event) {
  event.preventDefault();// evitamos el comportamiento por defecto del botón
  event.stopPropagation();// evitamos que el evento se propague

  console.log('Star clicked. Usuario:', getCurrentUser());

  const user = getCurrentUser();
  if (!user) {
    return window.location.href = 'iniciar.html'; // Redirigimos si no hay usuario se envia de nuevo a iniciar sesion
  }

  const btn = event.currentTarget;// obtenemos el botón que fue clickeado
  const id  = +btn.dataset.id;// obtenemos el id del personaje
  let favs  = getFavorites();// obtenemos el array de favoritos

  if (isFavorite(id)) { // verificamos que el id esté en favoritos
    favs = favs.filter(x => x !== id);// filtramos el id de los favoritos
    btn.textContent = '☆';// cambiamos el icono a no favorito
  } else {
    favs.push(id);// metodo para agregar a favoritos
    btn.textContent = '★';// cambiamos el icono a favorito
  }

  saveFavorites(favs); // Guardamos los favoritos actualizados
}

/** creamos una funcion asyncrona para Obtener personajes de la API */
async function fetchCharacters(page = 1) {
  try {
    const res  = await fetch(`${apiUrl}?page=${page}`);
    const data = await res.json();// 
    renderCharacters(data.results);
    renderPagination(data.info.pages);
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    container.innerHTML = `
      <p class="text-red-500 text-center">
        No se pudo cargar la información.
      </p>`;
  }
}

/** 9. Renderizar las cards */
function renderCharacters(characters) {
  container.innerHTML = '';

  characters.forEach(char => {
    const card = document.createElement('div');
    card.className =
      'bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center transition hover:scale-105';

    card.innerHTML = `
      <img
        src="${char.image}"
        alt="${char.name}"
        class="w-32 h-32 mx-auto rounded-full mb-4"
      />
      <h2 class="text-xl font-bold mb-2">${char.name}</h2>
      <p class="text-sm">🧬 Especie: ${char.species}</p>
      <p class="text-sm">❤️ Estado: ${char.status}</p>
    `;

    // Crear botón de favorito
    const favBtn = document.createElement('button');
    favBtn.type        = 'button';                       // <–– evitar submit
    favBtn.className   = 'favorite-btn text-2xl mt-2 cursor-pointer';
    favBtn.dataset.id  = char.id;
    favBtn.textContent = isFavorite(char.id) ? '★' : '☆';
    favBtn.addEventListener('click', onFavoriteClick);

    card.appendChild(favBtn);
    container.appendChild(card);
  });
}

/** 10. Renderizar la paginación */
function renderPagination(totalPages) {
  paginationContainer.innerHTML = '';

  const prevBtn = document.createElement('button'); // creamos el boton de anterior
  prevBtn.type      = 'button'; // <–– evitar submit
  prevBtn.textContent = '⬅️ Anterior';
  prevBtn.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4'; // estilos del boton
  prevBtn.disabled  = currentPage === 1;
  prevBtn.onclick   = () => { currentPage--; fetchCharacters(currentPage); };

  const pageIndicator = document.createElement('span'); // creamos el indicador de página
  pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
  pageIndicator.className = 'text-gray-700 dark:text-gray-200 font-medium mb-4';

  const nextBtn = document.createElement('button'); // creamos el boton de siguiente
  nextBtn.type       = 'button';
  nextBtn.textContent = 'Siguiente ➡️';
  nextBtn.className  = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4';
  nextBtn.disabled   = currentPage === totalPages;
  nextBtn.onclick    = () => { currentPage++; fetchCharacters(currentPage); };

  const navWrapper = document.createElement('div');
  navWrapper.className = 'flex flex-col sm:flex-row justify-center items-center gap-4';
  navWrapper.append(prevBtn, pageIndicator, nextBtn);

  paginationContainer.appendChild(navWrapper);// añadimos el contenedor de navegación a la paginación
}

/** 11. Inicialización al cargar el DOM */
document.addEventListener('DOMContentLoaded', () => {
  fetchCharacters(currentPage);
});