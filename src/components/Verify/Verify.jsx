import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { notifyApi } from 'notify';

import { Container, Section } from 'components';

import css from './Verify.module.css';

import { useEffect } from 'react';
import { verifyEmail } from 'store/operations';
import { LOGIN_ROUTE } from 'routes/routes';

export const Verify = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    notifyApi(
      dispatch(verifyEmail({ token }))
        .unwrap()
        .then(() => {
          navigate(LOGIN_ROUTE);
        }),
      `Updating your password`,
      true
    );
  }, [dispatch, navigate, token]);

  return (
    <Section className={css.sectionForm}>
      <Container className={css.Container}></Container>
    </Section>
  );
};
