import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const results = await searchMovies(query);
        setMovies(results);
        if (results.length === 0) {
          toast.info('No movies found for your search');
        }
      } catch (error) {
        toast.error('Failed to search movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div className={styles.container}>
      <SearchForm onSubmit={handleSubmit} />
      {isLoading && <div>Searching...</div>}
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