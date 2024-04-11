import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPowerOff, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';

import { HOME_ROUTE, LOGIN_ROUTE, SIGN_UP_ROUTE } from 'routes/routes';
import { AuthReducerSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logOut } from 'store/operations';

import css from './NavigationBar.module.css';

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(AuthReducerSelector);

  const handleLogOut = () =>
    notifyApi(dispatch(logOut()).unwrap(), 'Sign out', true);

  return (
    <header className={css.header}>
      <nav className={css.list}>
        <NavLink className={css.link} to={HOME_ROUTE}>
          LOGO
        </NavLink>
      </nav>

      {!isLoggedIn ? (
        <nav className={css.list}>
          <NavLink className={css.link} to={SIGN_UP_ROUTE}>
            <FaUserPlus size={20} />
          </NavLink>
          <NavLink className={css.link} to={LOGIN_ROUTE}>
            <FaSignInAlt size={20} />
          </NavLink>
        </nav>
      ) : (
        <nav className={css.list}>
          <span className={css.userName}>
            <IoMdPerson size={18} /> &nbsp; {user?.name || user.email}
          </span>
          <button
            type="button"
            className={`${css.logoutButton} ${css.link}`}
            onClick={handleLogOut}
          >
            <FaPowerOff size={18} />
          </button>
        </nav>
      )}
    </header>
  );
};

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import MenuItem from '@mui/material/MenuItem';

// const settings = ['Setting', 'Log out'];

// export const NavigationBar = () => {
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenUserMenu = event => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 0 }}>
//             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <Typography
//                 sx={{
//                   mr: 2,
//                 }}
//               >
//                 Remy Sharp
//               </Typography>
//               <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//             </IconButton>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map(setting => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
