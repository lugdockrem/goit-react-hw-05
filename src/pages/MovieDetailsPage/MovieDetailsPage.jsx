import { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        setError('Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <div className={styles.movieDetails}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.metadata}>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
          </div>
          <div className={styles.additionalInfo}>
            <h2>Additional Information</h2>
            <div className={styles.links}>
              <Link to="cast" className={styles.link}>Cast</Link>
              <Link to="reviews" className={styles.link}>Reviews</Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;