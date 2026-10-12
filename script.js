const API_URL = 'http://localhost:3000/api/movies';

async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    const movies = await response.json();
    
    displayMovies(movies);
  } catch (error) {
    console.error('Filmlarni yuklashda xatolik:', error);
  }
}


function displayMovies(movies) {
  const container = document.getElementById('movies-container');
  if (!container) return;

  container.innerHTML = ''; 
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <span>Janr: ${movie.genre}</span> | 
      <span>Reyting: ⭐ ${movie.rating}</span>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', fetchMovies);