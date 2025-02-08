import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from './SearchForm.module.css';

const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .min(2, 'Search query must be at least 2 characters')
    .required('Please enter a search query')
});

function SearchForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ query: '' }}
      validationSchema={SearchSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!values.query.trim()) {
          toast.error('Please enter a valid search query');
          setSubmitting(false);
          return;
        }
        onSubmit(values.query);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.searchForm}>
          <Field
            type="text"
            name="query"
            placeholder="Search for movies..."
            className={styles.searchInput}
          />
          {errors.query && touched.query && (
            <div className={styles.error}>{errors.query}</div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.searchButton}
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SearchForm;