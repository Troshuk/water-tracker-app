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
import SettingModal from 'components/SettingModal/SettingModal.jsx';

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(AuthReducerSelector);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(true);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () =>
    notifyApi(dispatch(logOut()).unwrap(), 'Sign out', true);

  const handleOpenSettingModal = () => {
    handleCloseUserMenu();
    setIsSettingModalOpen(true);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link to={HOME_ROUTE}>
          <Logo height="48" />
        </Link>
        {isLoggedIn ? (
          <>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <p className={css.username}>{user.name}</p>
              <Avatar
                alt={`${user?.name || user.email}`}
                src={user.avatarURL}
              />
              <Icon id="icon-chevron-double-up" width="16" height="16" />
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
              <MenuItem
                onClick={handleOpenSettingModal}
                className={css.menuItem}
              >
                <span className={css.icon}>
                  <Icon id="icon-cog-6-tooth" width="24" height="24" />
                </span>
                <span className={css.menuItemText}>Setting</span>
              </MenuItem>
              <MenuItem onClick={handleLogOut} className={css.menuItem}>
                <Typography textAlign="center">
                  <span className={css.icon}>
                    <Icon
                      id="icon-arrow-right-on-rectangle"
                      width="24"
                      height="24"
                    />
                  </span>
                  <span className={css.menuItemText}>Log out</span>
                </Typography>
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
      <SettingModal
        onClose={handleCloseSettingModal}
        open={isSettingModalOpen}
      />
    </header>
  );
};
