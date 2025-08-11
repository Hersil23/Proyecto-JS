const container = document.getElementById('characterContainer');
const paginationContainer = document.getElementById('pagination');
const apiUrl = 'https://rickandmortyapi.com/api/character';
let currentPage = 1; // 🆕 Página actual

// @function Obtener personajes con paginación
async function fetchCharacters(page = 1) {
  try {
    const res = await fetch(`${apiUrl}?page=${page}`); // 🆕 Se agrega parámetro de página
    const data = await res.json();
    renderCharacters(data.results);
    renderPagination(data.info.pages); // 🆕 Renderiza botones de paginación
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    container.innerHTML = '<p class="text-red-500 text-center">No se pudo cargar la información.</p>';
  }
}

// @function Renderizar tarjetas donde se alojan los personajes
function renderCharacters(characters) {
  container.innerHTML = '';
  characters.forEach(char => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center transition hover:scale-105';
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" class="w-32 h-32 mx-auto rounded-full mb-4" />
      <h2 class="text-xl font-bold mb-2">${char.name}</h2>
      <p class="text-sm">🧬 Especie: ${char.species}</p>
      <p class="text-sm">❤️ Estado: ${char.status}</p>
    `;
    container.appendChild(card);
  });
}

// 🆕 @function Renderizar botones de paginación
function renderPagination(totalPages) {
  paginationContainer.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '⬅️ Anterior';
  prevBtn.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    fetchCharacters(currentPage);
  };

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Siguiente ➡️';
  nextBtn.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    fetchCharacters(currentPage);
  };

  paginationContainer.appendChild(prevBtn);
  paginationContainer.appendChild(nextBtn);
}

// 🆕 Ejecutamos la función con la página inicial
fetchCharacters(currentPage);