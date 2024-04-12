import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from 'routes/routes';
import { Container, Section } from 'components';
import { logInSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logIn } from 'store/operations';
import css from './LoginFrom.module.css';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Icon } from 'components';
import { CssTextField } from '../FormTextField/TextFieldStyled.jsx';

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
      <IconButton
        position="end"
        onClick={() => setVisible(!visible)}
        sx={{ p: 0 }}
      >
        {visible ? (
          <Icon id="icon-eye" width="16" height="16" className={css.Icon} />
        ) : (
          <Icon
            id="icon-eye-slash"
            width="16"
            height="16"
            className={css.Icon}
          />
        )}
      </IconButton>
    );
  };

  return (
    <Section>
      <Container className={css.loginContainer}>
        <h1 className={css.title}>Sign In</h1>
        <form className={css.form} onSubmit={handleSubmit}>
          <label className={css.label}>
            <span>Enter your email</span>
            <CssTextField
              fullWidth
              type="text"
              name="email"
              required
              placeholder="Email"
              id={css['email_input']}
            />
          </label>
          <label className={css.label}>
            <span>Enter your password</span>
            <CssTextField
              fullWidth
              id={css['email_input']}
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
            Sign In
          </button>
        </form>
        <div className={css.redirectLink}>
          <NavLink to={SIGN_UP_ROUTE} className={css.link}>
            Sign Up
          </NavLink>
        </div>
        <div className={css.redirectLink}>
          <NavLink to={FORGOT_PASSWORD_ROUTE} className={css.link}>
            Forgot your password?
          </NavLink>
        </div>
        {/* <picture className="bottle">
          <source
            srcSet={`../../images/bottle-for-sign-in-desktop.png 1x, ../../images/bottle-for-sign-in-desktop-2x.png 2x`}
            media="(min-width: 1440px)"
            width="865"
            height="680"
            type="image/png"
          />
          <source
            srcSet={`../../images/botle-sign-in-tablet.png 1x, ../../images/botle-sign-in-tablet-2x.png 2x`}
            media="(min-width: 768px)"
            width="656"
            height="548"
            type="image/png"
          />
          <source
            srcSet={`../../images/bottle-sign-in-phone.png 1x, ../../images/bottle-sign-in-phone-2x.png 2x`}
            media="(min-width: 320px)"
            width="280"
            height="210"
            type="image/png"
          />
          <img
            className="bottle"
            alt="bottle of water"
            src={bottleHomeScreenPhone}
          />
        </picture> */}
      </Container>
    </Section>
  );
};
