import ReactModal from 'react-modal';
import styled from 'styled-components';

export const StyledReactModal = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #ffffff;
  font-family: 'Roboto';
  font-weight: 400;
  color: #2f2f2f;
  padding: 24px 12px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.2;
  box-sizing: border-box;

  @media (min-width: 1440px) {
    width: 592px;
    padding: 32px 24px;
  }

  @media (min-width: 768px) and (max-width: 1439px) {
    width: 704px;
    padding: 32px 24px;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    width: 280px;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleText = styled.div`
  font-size: 26px;
  font-family: 'Roboto';
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 24px;
`;
