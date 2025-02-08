import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/api';
import styles from './MovieList.module.css';

function MovieList({ movies, locationState }) {
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link 
            to={`/movies/${movie.id}`}
            state={locationState}
            className={styles.movieLink}
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.moviePoster}
              loading="lazy"
            />
            <h3 className={styles.movieTitle}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;