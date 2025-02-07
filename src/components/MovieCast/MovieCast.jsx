import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, getImageUrl } from '../../services/api';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        setError('Failed to load cast information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <div>Loading cast...</div>;
  if (error) return <div>{error}</div>;
  if (cast.length === 0) return <div>No cast information available</div>;

  return (
    <div className={styles.castContainer}>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={getImageUrl(actor.profile_path)}
              alt={actor.name}
              className={styles.actorImage}
            />
            <div className={styles.actorInfo}>
              <h3 className={styles.actorName}>{actor.name}</h3>
              <p className={styles.character}>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;