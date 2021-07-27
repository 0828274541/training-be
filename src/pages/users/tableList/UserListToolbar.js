import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';
import { useState } from 'react';
import ResponsiveDialog from '../../Dialog';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${theme.palette.grey} !important`
  },
  backgroundColor: 'red',
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
      color: 'white'
    },
  },
}));

// ----------------------------------------------------------------------

export default function UserListToolbar({
  numSelected,
  keyWord,
  onKeyWord,
  onDeleteList
}) {
  const [dialog, setDiaLog] = useState(false);
  function openDialog() {
    setDiaLog(true);
  }
  return (
    <>
      {dialog && <ResponsiveDialog onAction={onDeleteList} closeDialog={setDiaLog} />}
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter'
          })
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected}
            {' '}
            selected
          </Typography>
        ) : (
          <SearchStyle
            value={keyWord}
            onChange={onKeyWord}
            placeholder="Search user..."
            color="secondary"
            startAdornment={(
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: 'white' }}
                />
              </InputAdornment>
          )}
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={openDialog}>
              <Icon icon={trash2Fill} color="red" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              {/* <Icon icon={roundFilterList} /> */}
            </IconButton>
          </Tooltip>
        )}
      </RootStyle>
    </>
  );
}

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  keyWord: PropTypes.string,
  onKeyWord: PropTypes.func,
  onDeleteList: PropTypes.func
};
