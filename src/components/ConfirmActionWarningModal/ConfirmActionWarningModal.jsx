import ReactModal from 'react-modal';

import { Icon } from 'components';

import css from './ConfirmActionWarningModal.module.css';

ReactModal.setAppElement('#root');

export const ConfirmActionWarningModal = ({
  modalIsOpen,
  closeModal,
  title,
  confirmMessage,
  actionButtonName,
  actionCallBack,
}) => {
  return (
    <ReactModal
      contentLabel="Modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={{
        base: css.Modal,
        afterOpen: css.modalContentAfterOpen,
        beforeClose: css.modalContentBeforeClose,
      }}
      closeTimeoutMS={300}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <h1 className={css.title}>{title}</h1>

      <button className={css.closeBtn} type="button" onClick={closeModal}>
        <Icon
          className={css.deleteIcon}
          id="icon-close-x"
          width="14"
          height="14"
        />
      </button>

      <p className={css.areYouSure}>{confirmMessage}</p>
      <div className={css.btnThumb}>
        <button
          className={css.deleteBtn}
          type="button"
          onClick={actionCallBack}
        >
          {actionButtonName}
        </button>
        <button className={css.cancelBtn} type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </ReactModal>
  );
};
