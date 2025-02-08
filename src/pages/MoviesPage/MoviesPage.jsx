import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const results = await searchMovies(query);
      setMovies(results);
      navigate(`/movies?query=${query}`, { replace: true });
    } catch (error) {
      setError('Failed to search movies');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {isLoading && <div>Searching...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {movies.length > 0 && (
        <MovieList 
          movies={movies} 
          locationState={{ from: location }}
        />
      )}
    </div>
  );
}

export default MoviesPage;