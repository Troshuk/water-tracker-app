import { Container, Section } from 'components';
import { Hourglass } from 'react-loader-spinner';

export const PageLoader = props => {
  return (
    <Section>
      <Container>
        <Hourglass
          speed={1}
          visible={true}
          height={80}
          width="80"
          ariaLabel="hourglass-loading"
          {...props}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </Container>
    </Section>
  );
};
