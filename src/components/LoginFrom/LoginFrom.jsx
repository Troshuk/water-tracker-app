import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, ContentLoader, Icon, Section } from 'components';

import { logInSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logIn } from 'store/operations';
import { LoginSchema } from 'schemasValdiate/LoginSchema';
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from 'routes/routes';

import css from './LoginFrom.module.css';

export const LoginFrom = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { isLoading } = useSelector(logInSelector);

  const handleSubmit = ({ email, password }, actions) => {
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
              <div>
                <p className={css.textInput}>Enter your password</p>
                <div className={css.inputWithIcon}>
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
                  <Icon
                    id={visible ? 'icon-eye' : 'icon-eye-slash'}
                    width="16"
                    height="16"
                    className={css.iconField}
                    onClick={() => setVisible(!visible)}
                  />
                </div>

                {errors.password && touched.password && (
                  <p className={css.errorText}>{errors.password}</p>
                )}
                <button
                  type="submit"
                  className={css.buttonForm}
                  disabled={isLoading}
                >
                  Sign In {isLoading && <ContentLoader />}
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
      </Container>
    </Section>
  );
};
