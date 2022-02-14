import { wait } from "@testing-library/user-event/dist/utils";

const API_KEY = '38c007f28d5b66f36b9c3cf8d8452a4b'
const API_BASE = 'https://api.themoviedb.org/3'

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}&api_key=${API_KEY}`);
  const json = await req.json();
  return json;
}

export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch('/discover/tv?with_network=213&language=pt-BR')
      },
      {
        slug: 'treading',
        title: 'Recomendados para você',
        items: await basicFetch('/trending/all/week?language=pt-BR')
      },
      {
        slug: 'topreated',
        title: 'Em Alta',
        items: await basicFetch('/movie/top_rated?language=pt-BR')
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch('/discover/movie?with_genres=28&language=pt-BR')
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch('/discover/movie?with_genres=35&language=pt-BR')
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch('/discover/movie?with_genres=27&language=pt-BR')
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch('/discover/movie?with_genres=99&language=pt-BR')
      }
    ];
  },

  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch(type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=pt-BR`);
          break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR`);
          break;
        default:
          info = null;
          break;
      }
    }
    return info;
  }
}
