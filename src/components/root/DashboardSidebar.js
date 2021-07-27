/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button,
  ListItem
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import NavItem from './NavItem';
import { user, items } from './MenuSidebar';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);
  user.name = `${role} : CuongNM`;
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const [arrIndex, setArrIndex] = useState([]);
  function toggleClass(index) {
    if (arrIndex.includes(index)) {
      setArrIndex(arrIndex.filter((item) => item !== index));
    } else {
      setArrIndex([...arrIndex, index]);
    }
  }
  useEffect(() => {
    const index = items.findIndex((item) => {
      if (item.children && !!item.children.find((itemChildren) => itemChildren.href === location.pathname)) {
        return item;
      }
      return null;
    });
    setArrIndex([index]);
  }, [location.pathname]);

  function Welcome({
    itemChildren, title, icon: Icon, index
  }) {
    return (
      <>
        <ListItem
          disableGutters
          sx={{
            display: 'flex',
            py: 0,
          }}
        >
          <Button
            sx={{
              color: 'white',
              fontWeight: 'medium',
              justifyContent: 'flex-start',
              letterSpacing: 0,
              py: 1.25,
              textTransform: 'none',
              width: '100%',
              '& svg': {
                mr: 1
              }
            }}
            onClick={() => { toggleClass(index); }}
          >
            {Icon && (
            <Icon size="20" />
            )}
            <span>
              {title}
            </span>
          </Button>
        </ListItem>
        <Collapse in={arrIndex.includes(index)} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <List>
              {itemChildren.map((item) => (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            </List>
          </Box>
        </Collapse>
      </>
    );
  }

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          width: '235px'
        }}
        style={{ backgroundImage: 'url(/static/images/avatars/unnamed.png)', backgroundPosition: 'bottom' }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/admin/account"
        />
        <Typography
          color="white"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="white"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item, index) => (
            !item.children
              ? (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ) : <Welcome key={item.title} itemChildren={item.children} title={item.title} icon={item.icon} index={index} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
              backgroundColor: 'text.black'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
              backgroundColor: 'text.black',
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
