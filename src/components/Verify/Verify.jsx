import { Container, Section } from 'components';

import css from './Verify.module.css';

export const Verify = () => {
  return (
    <Section className={css.sectionForm}>
      <Container className={css.Container}>
        <div className={css.titleThumb}>
          <h1 className={css.title}>
            Your email has been successfully verified
          </h1>
        </div>
      </Container>
    </Section>
  );
};
