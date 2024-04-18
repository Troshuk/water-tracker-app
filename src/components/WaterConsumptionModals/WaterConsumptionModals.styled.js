import ReactModal from 'react-modal';
import styled from 'styled-components';

ReactModal.setAppElement('#root');

export const StyledReactModal = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: auto;
  background-color: #ffffff;
  border-radius: 10px;
`;
