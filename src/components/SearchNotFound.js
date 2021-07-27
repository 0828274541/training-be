import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other} sx={{ backgroundColor: 'black', color: 'white', width: '100%' }}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>
          &quot;
          {searchQuery}
          &quot;
        </strong>
        . Try checking for typos or using complete words.
      </Typography>
    </Paper>
  );
}
SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};
