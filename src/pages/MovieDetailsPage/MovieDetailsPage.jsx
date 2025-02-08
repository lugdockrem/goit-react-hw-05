import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const defaultImg = "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        toast.error('Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) return <div>Loading...</div>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backButton}>
        ← Go back
      </Link>
      <div className={styles.movieDetails}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImg}
          alt={movie.title}
          className={styles.poster}
          width={250}
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
              <Link 
                to="cast"
                state={{ from: backLinkRef.current }}
                className={styles.link}
              >
                Cast
              </Link>
              <Link 
                to="reviews"
                state={{ from: backLinkRef.current }}
                className={styles.link}
              >
                Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;