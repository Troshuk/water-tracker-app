import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { HOME_ROUTE, LOGIN_ROUTE } from 'routes/routes';
import { AuthReducerSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logOut } from 'store/operations';
import css from './NavigationBar.module.css';
import { ReactComponent as Logo } from 'images/logo.svg';
import { ConfirmActionWarningModal, Container, Icon } from 'components';

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

  const handleLogoutConfirmation = () => setIsOpen(true);

  const handleLogOut = () => {
    notifyApi(
      dispatch(logOut())
        .unwrap()
        .finally(() => setIsOpen(false)),
      'Sign out',
      true
    );
  };

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link to={HOME_ROUTE}>
          <Logo height="48" />
        </Link>
        {isLoggedIn ? (
          <>
            <div className={css.containerArrowCategory}>
              <button
                className={css.userMenuToggle}
                onClick={handleToggleUserMenu}
              >
                <Icon
                  alt={`${user?.name || user.email}`}
                  id="icon-user"
                  width="28"
                  height="28"
                />
              </button>
              <button className={css.userMenu} onClick={handleToggleUserMenu}>
                <Icon
                  id="icon-chevron-double-up"
                  width="28"
                  height="28"
                  className={css.icon}
                />
              </button>
              {isMenuOpen && (
                <ul className={css.userMenuDropdown}>
                  <li onClick={handleCloseUserMenu} className={css.menuItem}>
                    <NavLink>
                      <div className={css.itemIcon}>
                        <span>Setting</span>
                        <Icon id="icon-cog-6-tooth" width="16" height="16" />
                      </div>
                    </NavLink>
                  </li>
                  <li
                    onClick={handleLogoutConfirmation}
                    className={css.menuItem}
                  >
                    <NavLink>
                      <div className={css.itemIcon}>
                        <span>Log out</span>
                        <Icon
                          id="icon-arrow-right-on-rectangle"
                          width="16"
                          height="16"
                        />
                      </div>
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <NavLink
            to={LOGIN_ROUTE}
            className={css.link}
            style={{ textDecoration: 'none' }}
          >
            <span>Sign in</span>
            <Icon id="icon-user" width="28" height="28" />
          </NavLink>
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
