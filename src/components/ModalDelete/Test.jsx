import { useState } from 'react';
import { Container } from 'components';

import { ModalDelete } from 'components/ModalDelete/ModalDelete.jsx';

import css from './ModalDelete.module.css';

export const Test = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container className={css.OpenModalContainer}>
      <button
        className={css.openModalBtn}
        type="button"
        onClick={openModal}
      >Open modal</button>
      <ModalDelete
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      ></ModalDelete>
    </Container>
  );
};
