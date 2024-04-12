import { NavLink } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { ContentLoader } from 'components';
import { FORGOT_PASSWORD, SIGN_UP_ROUTE } from 'routes/routes';
import { logInSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logIn } from 'store/operations';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import css from './LoginFrom.module.css';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { VisibilityOffOutlined } from '@mui/icons-material';

export const LoginFrom = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(logInSelector);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    notifyApi(
      dispatch(logIn(data))
        .unwrap()
        .then(() => e.target.reset()),
      `Attempt to login as: ${data.email}`,
      true
    );
  };
  const EndAdorment = ({ visible, setVisible }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <VisibilityOffOutlined /> : <RemoveRedEyeOutlinedIcon />}
        </IconButton>
      </InputAdornment>
    );
  };
  return (
    <div className={css.loginContainer}>
      <h1 className={css.title}>Sign In</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <span>Enter your email</span>
          <TextField
            fullWidth
            type="text"
            name="email"
            required
            placeholder="Email"
          />
        </label>
        <label className={css.label}>
          <span>Enter your password</span>
          <TextField
            fullWidth
            style={{}}
            type={visible ? 'text' : 'password'}
            name="password"
            required
            placeholder="Password"
            InputProps={{
              endAdornment: (
                <EndAdorment visible={visible} setVisible={setVisible} />
              ),
            }}
          />
        </label>
        <button type="submit" className={css.button} disabled={isLoading}>
          Sign In &nbsp; {isLoading ? <ContentLoader /> : <FaSignInAlt />}
        </button>
      </form>
      <div className={css.redirectLink}>
        <NavLink to={SIGN_UP_ROUTE} className={css.link}>
          Sign Up
        </NavLink>
      </div>
      <div className={css.redirectLink}>
        <NavLink to={FORGOT_PASSWORD} className={css.link}>
          Forgot your password?
        </NavLink>
      </div>
      {/* <picture className="bottle">
        <source
          media="(min-width: 1440px)"
          width="865"
          height="680"
          type="image/png"
        />
        <source
          media="(min-width: 768px)"
          width="656"
          height="548"
          type="image/png"
        />
        <source
          media="(min-width: 320px)"
          width="280"
          height="210"
          type="image/png"
        />
        <img className="bottle" alt="bottle of water" />
      </picture> */}
    </div>
  );
};
