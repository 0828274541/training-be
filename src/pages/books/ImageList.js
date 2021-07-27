import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog({ cover }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Image
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <ImageList className={classes.imageList} cols={1}>
              {cover.length ? cover.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ImageListItem key={index}>
                  <img src={`http://localhost:3001/${item}`} alt="" />
                  <ImageListItemBar
                    title=""
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </ImageListItem>
              )) : (
                <ImageListItem>
                  <img src="http://localhost:3001/public/covers/noimg.jpg" alt="" />
                  <ImageListItemBar
                    title=""
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </ImageListItem>
              ) }
            </ImageList>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MaxWidthDialog.propTypes = {
  cover: PropTypes.any
};
