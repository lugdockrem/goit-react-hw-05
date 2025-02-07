import axios from 'axios';

const API_KEY = 'df2b080094a6e7429a27e0a6ec4ff587';
const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjJiMDgwMDk0YTZlNzQyOWEyN2UwYTZlYzRmZjU4NyIsIm5iZiI6MTczODg3ODY5MC43MDMsInN1YiI6IjY3YTUyZWUyYWNhOTFkYTRiYTg1Y2VjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3oSwZ2ItSArSMVZ_SmCIL4qO9SzwQA1ojAO3KufDX5M';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const getTrendingMovies = async () => {
  try {
    const response = await instance.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await instance.get('/search/movie', {
      params: {
        query,
        include_adult: false,
        page: 1
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await instance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await instance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return [];
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await instance.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    return [];
  }
};

export const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/500x750.png?text=No+Image';
  return `https://image.tmdb.org/t/p/w500${path}`;
};