import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/api';
import styles from './MovieList.module.css';
import appStyles from '../../App.module.css'; // Импортируем стили из App.module.css

function MovieList({ movies }) {
  return (
    <div className={appStyles.container}> {/* Оборачиваем в контейнер */}
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
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
    </div>
  );
}

export default MovieList;