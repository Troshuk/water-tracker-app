import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { notifyApi } from 'notify';

import { forgotPasswordSelector } from 'store/selectors';
import { Container, Section } from 'components';
import { LOGIN_ROUTE, UPDATE_PASSWORD_PAGE } from 'routes/routes';
import { ContentLoader } from 'components';
import { forgotPassword } from 'store/operations';
import css from './ForgotPassword.module.css';

export const ForgotPassword = () => {
  const { isLoading } = useSelector(forgotPasswordSelector);
  const dispatch = useDispatch();

  const handleSubmit = ({ email }, actions) => {
    notifyApi(
      dispatch(forgotPassword({ email })).then(() => {
        actions.resetForm();
      }),
      `Sending your password reset email`,
      true
    );
  };

  return (
    <Section className={css.sectionForm}>
      <Container className={css.resetPasswordContainer}>
        <div className={css.titleThumb}>
          <h1 className={css.title}>
            Forgot your password?
            <br />
            <br />
            Enter your email, and we'll send you a message
          </h1>
        </div>

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.formContainer}>
              <div className={css.containerEmail}>
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
                <button
                  type="submit"
                  className={css.buttonForm}
                  disabled={isLoading}
                >
                  Send {isLoading && <ContentLoader />}
                </button>
              </div>
              <NavLink to={LOGIN_ROUTE} className={css.redirectLink}>
                Sign In
              </NavLink>
              <NavLink to={UPDATE_PASSWORD_PAGE} className={css.redirectLink}>
                Update
              </NavLink>
            </Form>
          )}
        </Formik>
      </Container>
    </Section>
  );
};
