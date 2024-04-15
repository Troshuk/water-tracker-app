import {
  StyledReactModal,
  TitleText,
  WrapHeader,
} from './DailyNormaModal.styled';
import { Icon } from 'components';

export const DailyNormaModal = ({ modalIsOpen, closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <StyledReactModal
      contentLabel="Modal"
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <WrapHeader>
        <TitleText>My daily norma</TitleText>
        <button type="button" onClick={handleCloseModal}>
          <Icon id="icon-plus-small" width="36" height="36" />
        </button>
      </WrapHeader>
    </StyledReactModal>
  );
};
