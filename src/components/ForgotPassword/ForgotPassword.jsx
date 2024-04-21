import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { notifyApi } from 'notify';

import { forgotPasswordSelector } from 'store/selectors';
import { Container, Section } from 'components';
import { LOGIN_ROUTE } from 'routes/routes';
import { ContentLoader } from 'components';
import { forgotPassword } from 'store/operations';
import css from './ForgotPassword.module.css';

export const ForgotPassword = () => {
  const { isLoading } = useSelector(forgotPasswordSelector);
  const dispatch = useDispatch();
  // const location = useLocation();

  const handleSubmit = (body, actions) => {
    // const token = new URLSearchParams(location.search).get('token');
    const email = body.email;
    const data = { email };

    notifyApi(
      dispatch(forgotPassword(data)).then(() => {
        actions.resetForm();
      }),
      `The letter was send`,
      true
    );
  };

  return (
    <Section className={css.sectionForm}>
      <Container className={css.resetPasswordContainer}>
        <div className={css.titleFormThumb}>
          <h1 className={css.title}>
            Forgot your password?
            <br />
            Enter your email
          </h1>

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
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Section>
  );
};
