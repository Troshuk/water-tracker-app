import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import bottleSignInDesktop2x from 'images/bottle-for-sign-in-desktop-2x.png';
import bottleSignInDesktop from 'images/sign-background-desktop.png';
import bottleSignInTablet2x from 'images/botle-sign-in-tablet-2x.png';
import bottleSignInTablet from 'images/sign-background-tablet.png';
import bottleSignInPhone2x from 'images/bottle-sign-in-phone-2x.png';
import bottleSignInPhone from 'images/sign-background-phone.png';
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from 'routes/routes';
import { Container, Icon, Section } from 'components';
import { logInSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logIn } from 'store/operations';
import css from './LoginFrom.module.css';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { LoginSchema } from 'schemasValdiate/LoginSchema';

export const LoginFrom = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { isLoading } = useSelector(logInSelector);

  const handleSubmit = (values, actions) => {
    const { email, password } = values;
    if (!email || !password) {
      return toast.error('Email and password are required');
    }
    notifyApi(
      dispatch(logIn({ email, password }))
        .unwrap()
        .then(() => actions.resetForm()),
      `Attempt to login as: ${email}`,
      true
    );
  };

  return (
    <Section className={css.sectionForm}>
      <Container className={css.loginContainer}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.formContainer}>
              <div className={css.containerEmail}>
                <h1 className={css.titleForm}>Sign In</h1>
                <p className={css.textInput}>Enter your email</p>
                <Field
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  className={`${css.inputField} ${
                    errors.email && touched.email
                      ? `${css.inputError} ${css.error}`
                      : ''
                  }`}
                />
                {errors.email && touched.email && (
                  <p className={`${css.errorText} ${css.errorText}`}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className={css.inputWithIcon}>
                <p className={css.textInput}>Enter your password</p>
                <Field
                  type={visible ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={`${css.inputField} ${
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
                      className={css.iconField}
                    />
                  ) : (
                    <Icon
                      id="icon-eye-slash"
                      width="16"
                      height="16"
                      className={css.iconField}
                    />
                  )}
                </IconButton>
                {errors.password && touched.password && (
                  <p className={css.errorText}>{errors.password}</p>
                )}
                <button
                  type="submit"
                  className={css.buttonForm}
                  disabled={isLoading}
                >
                  Sign In
                </button>
              </div>
              <div className={css.redirectLink}>
                <NavLink to={SIGN_UP_ROUTE} className={css.linkForm}>
                  Sign Up
                </NavLink>
              </div>
              <div className={css.redirectForgot}>
                <NavLink to={FORGOT_PASSWORD_ROUTE} className={css.linkForm}>
                  Forgot your password?
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
        <div>
          <picture className={css.bottlePicture}>
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
