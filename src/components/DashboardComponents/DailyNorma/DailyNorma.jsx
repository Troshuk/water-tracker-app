import { useEffect, useState } from 'react';
import { DailyNormaModal } from 'components/DashboardComponents/DailyNorma/DailyNormaModal/DailyNormaModal.jsx';
import { Button, Text, TextWater, Wrap, BtnWrap } from './DailyNorma.styled.js';

export const DailyNorma = () => {
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
    <Wrap>
      <Text>My daily norma</Text>
      <BtnWrap>
        <TextWater>1.5 L</TextWater>
        <Button type="button" onClick={openModal}>
          <span>Edit</span>
        </Button>
        <DailyNormaModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </BtnWrap>
    </Wrap>
  );
};
