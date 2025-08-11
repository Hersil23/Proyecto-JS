const container = document.getElementById('characterContainer'); // Contenedor de personajes
const paginationContainer = document.getElementById('pagination'); // Contenedor de paginación
const apiUrl = 'https://rickandmortyapi.com/api/character';
let currentPage = 1; // Página actual

// @function Obtener personajes con paginación
async function fetchCharacters(page = 1) {
  try {
    const res = await fetch(`${apiUrl}?page=${page}`);
    const data = await res.json();
    renderCharacters(data.results);
    renderPagination(data.info.pages); // Renderiza botones y número de página
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    container.innerHTML = '<p class="text-red-500 text-center">No se pudo cargar la información.</p>';
  }
}

// @function Renderizar tarjetas de personajes
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

// @function Renderizar paginación con número de página
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

  const pageIndicator = document.createElement('span');
  pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
  pageIndicator.className = 'text-gray-700 dark:text-gray-200 font-medium mb-4';

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Siguiente ➡️';
  nextBtn.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    fetchCharacters(currentPage);
  };

  const navWrapper = document.createElement('div');
  navWrapper.className = 'flex flex-col sm:flex-row justify-center items-center gap-4';

  navWrapper.appendChild(prevBtn);
  navWrapper.appendChild(pageIndicator);
  navWrapper.appendChild(nextBtn);

  paginationContainer.appendChild(navWrapper);
}

// Ejecutar con la página inicial
fetchCharacters(currentPage);