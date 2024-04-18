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
  const { isLoggedIn } = useSelector(AuthReducerSelector);
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
                <Icon id="icon-user" width="28" height="28" />
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
