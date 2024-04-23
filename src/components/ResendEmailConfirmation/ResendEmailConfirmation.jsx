import { Formik, Form, Field } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { notifyApi } from 'notify';

import { Container, Section, ContentLoader } from 'components';
import css from './ResendEmail.module.css';

import { resendEmailSelector } from 'store/selectors';
import { resendEmail } from 'store/operations';
import { LOGIN_ROUTE } from 'routes/routes';

export const ResendEmailConfirmation = () => {
  const { isLoading } = useSelector(resendEmailSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = ({ email }, actions) => {
    notifyApi(
      dispatch(resendEmail({ email }))
        .unwrap()
        .then(() => {
          actions.resetForm();
          navigate(LOGIN_ROUTE);
        }),
      `Sending you letter: ${email}`,
      true
    );
  };

  return (
    <Section className={css.sectionForm}>
      <Container className={css.Container}>
        <div className={css.titleFormThumb}>
          <h1 className={css.title}>
            Can't login?
            <br />
            Confirm your email
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
                    Send
                    {isLoading && <ContentLoader />}
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
