import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { DailyNormaModal } from './DailyNormaModal/DailyNormaModal.jsx';
import { Button, Text, TextWater, Wrap, BtnWrap } from './DailyNorma.styled.js';
import {
  dailyWaterGoalSelector,
  dayConsumptionWaterGoalSelector,
  viewingDateSelector,
} from 'store/selectors.js';

export const DailyNorma = () => {
  const dailyWaterGoal = useSelector(dailyWaterGoalSelector);
  const viewingDate = useSelector(viewingDateSelector);
  const viewingDateDailyWaterGoal = useSelector(
    dayConsumptionWaterGoalSelector
  );

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

  const waterValue = (
    (viewingDateDailyWaterGoal || dailyWaterGoal) / 1000
  ).toFixed(1);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Wrap>
      <Text>
        My daily norma
        {viewingDate && (
          <>
            <br />
            {moment(viewingDate).format('LL')}
          </>
        )}
      </Text>

      <BtnWrap>
        <TextWater>{waterValue} L</TextWater>
        <Button type="button" onClick={openModal}>
          <span>Edit</span>
        </Button>
        <DailyNormaModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </BtnWrap>
    </Wrap>
  );
};
