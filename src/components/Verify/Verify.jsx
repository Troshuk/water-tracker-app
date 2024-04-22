import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { notifyApi } from 'notify';

import { Container, Section, PageLoader } from 'components';

import css from './Verify.module.css';

import { useEffect } from 'react';
import { verifyEmail } from 'store/operations';
import { LOGIN_ROUTE } from 'routes/routes';
import { verifyEmailSelector } from 'store/selectors';

export const Verify = () => {
  const { isLoading } = useSelector(verifyEmailSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    notifyApi(
      dispatch(verifyEmail(token))
        .unwrap()
        .finally(() => navigate(LOGIN_ROUTE)),
      `Verifying your email`,
      true
    );
  }, [dispatch, navigate, token]);

  return (
    <Section className={css.sectionForm}>
      <Container className={css.Container}>
        {isLoading && <PageLoader />}
      </Container>
    </Section>
  );
};
