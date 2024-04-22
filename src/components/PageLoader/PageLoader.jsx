import { Container, Section } from 'components';
import { Hourglass } from 'react-loader-spinner';

export const PageLoader = props => {
  return (
    <Section>
      <Container>
        <Hourglass
          wrapperStyle={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          visible={true}
          height="150"
          width="150"
          {...props}
          ariaLabel="hourglass-loading"
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </Container>
    </Section>
  );
};
