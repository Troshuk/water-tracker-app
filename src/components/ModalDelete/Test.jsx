import { useState, useEffect } from 'react';
import {  Container } from 'components';
import { ModalDelete } from 'components/ModalDelete/ModalDelete.jsx';
import css from './ModalDelete.module.css'


export const Test = () => {
const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (modalIsOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [modalIsOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
    
    return (
<Container className={css.homeContainer}>
            <button className={css.openModalBtn} type="button" onClick={openModal}></button> 
      <ModalDelete modalIsOpen={modalIsOpen} closeModal={closeModal}></ModalDelete>
</Container>
       
      
)}
