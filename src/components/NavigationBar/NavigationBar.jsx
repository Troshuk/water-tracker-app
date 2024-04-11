import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

import { HOME_ROUTE, LOGIN_ROUTE } from 'routes/routes';
import { AuthReducerSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logOut } from 'store/operations';

import css from './NavigationBar.module.css';
import { ReactComponent as Logo } from 'images/logo.svg';
import { Container, Icon } from 'components';

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(AuthReducerSelector);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () =>
    notifyApi(dispatch(logOut()).unwrap(), 'Sign out', true);

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link to={HOME_ROUTE}>
          <Logo height="48" />
        </Link>
        {isLoggedIn ? (
          <>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={`${user?.name || user.email}`}
                src="/static/images/avatar/2.jpg"
              />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Setting</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <NavLink className={css.link} to={LOGIN_ROUTE}>
            <span>Sign in</span>
            <Icon id="icon-user" width="28" height="28" />
          </NavLink>
        )}
      </Container>
    </header>
  );
};
