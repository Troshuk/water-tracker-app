import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { ConfirmActionWarningModal, Container, Icon } from 'components';

import { HOME_ROUTE, LOGIN_ROUTE } from 'routes/routes';
import { AuthReducerSelector } from 'store/selectors';
import { logOut } from 'store/operations';
import { notifyApi } from 'notify';

import { ReactComponent as Logo } from 'images/logo.svg';
import css from './NavigationBar.module.css';

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(AuthReducerSelector);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseUserMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutConfirmation = () => {
    handleCloseUserMenu();
    setIsOpen(true);
  };

  const handleLogOut = () => {
    notifyApi(
      dispatch(logOut())
        .unwrap()
        .finally(() => setIsOpen(false)),
      'Sign out',
      true
    );
  };

  const shortName = () => user?.name?.split(' ')?.[0]?.substring(0, 15);
  const emailName = () => user?.email?.split('@')?.[0];

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link to={HOME_ROUTE}>
          <Logo height="48" />
        </Link>
        {isLoggedIn ? (
          <div>
            <button
              className={css.userMenuToggle}
              onClick={handleToggleUserMenu}
            >
              <span className={css.userName}>{shortName() || emailName()}</span>
              {user.avatarURL ? (
                <img
                  alt={user.name || user.email}
                  src={user.avatarURL}
                  width="28"
                  height="28"
                  className={css.iconUser}
                />
              ) : (
                <Icon id="icon-user" width="28" height="28" />
              )}
              <Icon
                id="icon-chevron-double-up"
                width="16"
                height="16"
                className={css.icon}
                style={{
                  transform: isMenuOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              />
            </button>

            {isMenuOpen && (
              <div className={css.profileDropDown}>
                <ul className={css.userMenuDropdown}>
                  <li onClick={handleCloseUserMenu} className={css.menuItem}>
                    <Link className={css.itemIcon}>
                      <span className={css.itemText}>Setting</span>
                      <Icon
                        id="icon-cog-6-tooth"
                        width="16"
                        height="16"
                        className={css.iconOption}
                      />
                    </Link>
                  </li>
                  <li
                    onClick={handleLogoutConfirmation}
                    className={css.menuItem}
                  >
                    <button className={css.itemIcon}>
                      <span className={css.itemText}>Logout</span>
                      <Icon
                        id="icon-arrow-right-on-rectangle"
                        width="16"
                        height="16"
                        className={css.iconOption}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={LOGIN_ROUTE}
            className={css.link}
            style={{ textDecoration: 'none' }}
          >
            <span className={css.userName}>Sign in</span>
            <Icon id="icon-user" width="28" height="28" />
          </Link>
        )}
      </Container>

      <ConfirmActionWarningModal
        modalIsOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        actionCallBack={handleLogOut}
        title="Log out"
        confirmMessage="Do you really want to leave?"
        actionButtonName="Log out"
      />
    </header>
  );
};
