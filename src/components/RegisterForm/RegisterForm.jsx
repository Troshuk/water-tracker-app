import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { RegisterSchema } from '../../schemasValdiate/RegisterSchema.jsx';
import { NavLink } from 'react-router-dom';
import bottleSignInDesktop2x from 'images/bottle-for-sign-in-desktop-2x.png';
import bottleSignInDesktop from 'images/bottle-for-sign-in-desktop.png';
import bottleSignInTablet2x from 'images/botle-sign-in-tablet-2x.png';
import bottleSignInTablet from 'images/botle-sign-in-tablet.png';
import bottleSignInPhone from 'images/bottle-sign-in-phone.png';
import bottleSignInPhone2x from 'images/bottle-sign-in-phone-2x.png';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Icon, Section } from 'components';
import { signUpSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import css from './RegisterForm.module.css';
import { IconButton } from '@mui/material';
import { signUp } from 'store/operations.js';
import { LOGIN_ROUTE } from 'routes/routes.js';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
  const [visible, setVisible] = useState(false);
  const [visibleEye, setVisibleEye] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(signUpSelector);

  const handleSubmit = (e, values) => {
    const { email, password, passwordRepeat } = values;
    const formData = new FormData(e.target);
    const data = {};
    if (!email || !password || !passwordRepeat) {
      return toast.error('Email , password and repeat password are required');
    }
    formData.forEach((value, key) => {
      data[key] = value;
    });

    notifyApi(
      dispatch(signUp(data))
        .unwrap()
        .then(() => e.target.reset()),
      `Creating new user: ${data.name}`,
      true
    );
  };

  return (
    <Section>
      <Container className={css.loginContainer}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordRepeat: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <div className={css.containerEmail}>
                <h1 className={css.title}>Sign Up</h1>
                <p className={css.Text}>Enter your email</p>
                <Field
                  type="text"
                  name="email"
                  autoComplete="true"
                  placeholder="E-mail"
                  className={`${css.Input} ${
                    errors.email && touched.email
                      ? `${css.inputError} ${css.error}`
                      : ''
                  }`}
                />
                {errors.email && touched.email && (
                  <div className={`${css.errorText} ${css.errorText}`}>
                    {errors.email}
                  </div>
                )}
              </div>
              <div className={css.inputWithIcon}>
                <p className={css.Text}>Enter your password</p>
                <Field
                  type={visible ? 'text' : 'password'}
                  name="password"
                  autoComplete="true"
                  placeholder="Password"
                  className={`${css.Input} ${
                    errors.password && touched.password
                      ? `${css.inputError} ${css.error}`
                      : ''
                  }`}
                />
                <IconButton
                  position="end"
                  onClick={() => setVisible(!visible)}
                  sx={{ p: 0 }}
                >
                  {visible ? (
                    <Icon
                      id="icon-eye"
                      width="16"
                      height="16"
                      className={css.Icon}
                    />
                  ) : (
                    <Icon
                      id="icon-eye-slash"
                      width="16"
                      height="16"
                      className={css.Icon}
                    />
                  )}
                </IconButton>
                {errors.password && touched.password && (
                  <div className={css.errorText}>{errors.password}</div>
                )}
              </div>
              <div className={css.inputWithIconEye}>
                <p className={css.Text}>Repeat password</p>
                <Field
                  type={visibleEye ? 'text' : 'password'}
                  autoComplete="true"
                  name="passwordRepeat"
                  placeholder="Repeat password"
                  className={`${css.Input} ${
                    errors.passwordRepeat && touched.passwordRepeat
                      ? `${css.inputError} ${css.error}`
                      : ''
                  }`}
                />
                <IconButton
                  position="end"
                  onClick={() => setVisibleEye(!visibleEye)}
                  sx={{ p: 0 }}
                >
                  {visibleEye ? (
                    <Icon
                      id="icon-eye"
                      width="16"
                      height="16"
                      className={css.Icon}
                    />
                  ) : (
                    <Icon
                      id="icon-eye-slash"
                      width="16"
                      height="16"
                      className={css.Icon}
                    />
                  )}
                </IconButton>
                {errors.passwordRepeat && touched.passwordRepeat && (
                  <div className={css.errorText}>{errors.passwordRepeat}</div>
                )}
              </div>
              <button type="submit" className={css.button} disabled={isLoading}>
                Sign Up
              </button>
              <div className={css.redirectLink}>
                <NavLink to={LOGIN_ROUTE} className={css.link}>
                  Sign In
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>

        <div>
          <picture className={css.bottle}>
            <source
              srcSet={`${bottleSignInDesktop} 1x, ${bottleSignInDesktop2x} 2x`}
              media="(min-width: 1440px)"
              width="865"
              height="680"
              type="image/png"
            />
            <source
              srcSet={`${bottleSignInTablet} 1x, ${bottleSignInTablet2x} 2x`}
              media="(min-width: 768px)"
              width="656"
              height="548"
              type="image/png"
            />
            <source
              srcSet={`${bottleSignInPhone} 1x, ${bottleSignInPhone2x} 2x`}
              media="(min-width: 320px)"
              width="280"
              height="210"
              type="image/png"
            />
            <img
              className={css.bottle}
              alt="bottle of water"
              src={bottleSignInPhone}
            />
          </picture>
        </div>
      </Container>
    </Section>
  );
};
