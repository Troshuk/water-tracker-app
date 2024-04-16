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
    <Container className={css.homeContainer}>
      <button
        className={css.openModalBtn}
        type="button"
        onClick={openModal}
      ></button>
      <ModalDelete
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      ></ModalDelete>
    </Container>
  );
};
