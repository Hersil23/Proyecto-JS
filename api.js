// script.js

const container = document.getElementById('characterContainer');
const apiUrl = 'https://rickandmortyapi.com/api/character';

// @function Obtener personajes
async function fetchCharacters() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    renderCharacters(data.results);
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

// ejecutamos la función para obtener los personajes
fetchCharacters();