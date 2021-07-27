import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ResponsiveDialog from '../../Dialog';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id, onDeleteItem }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDiaLog] = useState(false);
  function openDialog() {
    setDiaLog(true);
    setIsOpen(false);
  }

  return (
    <>
      {dialog && <ResponsiveDialog id={id} onAction={onDeleteItem} closeDialog={setDiaLog} />}
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} color="red" />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={openDialog}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to={`/admin/book/update/${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

UserMoreMenu.propTypes = {
  id: PropTypes.any,
  onDeleteItem: PropTypes.any
};
