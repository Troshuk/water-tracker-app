import { Container, Section } from 'components';
import { Hourglass } from 'react-loader-spinner';

export const PageLoader = props => {
  return (
    <Section>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Hourglass
          visible={true}
          height="80"
          width="80"
          {...props}
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </Container>
    </Section>
  );
};
