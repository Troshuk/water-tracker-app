import { Container, Section } from 'components';
import css from './Welcome.module.css';

export const Welcome = () => {
  return (
    <Section className={css.section}>
      <Container className={css.homeContainer}>
        <h1 className={css.title}>Welcome to the App</h1>
      </Container>
    </Section>
  );
};
