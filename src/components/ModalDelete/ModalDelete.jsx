// import { useEffect } from 'react';

import { Icon } from 'components';
import css from '../../components/ModalDelete/ModalDelete.module.css';

export const ModalDelete = ({ modalIsOpen, closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };
    
    const overlayClassName = modalIsOpen ? `${css.Overlay} ${css.open}` : css.Overlay;

  return (
    <div
          className={overlayClassName}
          onClick={handleCloseModal} >
      <div className={css.Modal}>
        <div className={css.titleThumb}>
          <h1 className={css.title}>Delete entry</h1>
          <button
            className={css.closeBtn}
            type="button"
            onClick={handleCloseModal}
          >
            <Icon
              className={css.deleteIcon}
              id="icon-plus-small"
              width="24"
              height="24"
            />
          </button>
        </div>

        <p className={css.areYouSure}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.btnThumb}>
          <button className={css.deleteBtn} type="button">
            Delete
          </button>
          <button
            className={css.cancelBtn}
            type="button"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};



//     const handleOverlayClick = e => {
//     if (e.target === e.currentTarget && closeModal) {
//       closeModal();
//     }

//     };

//      const handleKeyDown = e => {
//       if (e.code === 'Escape') {
//         closeModal();
//       }
//     };

//   useEffect(() => {

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [closeModal]);
