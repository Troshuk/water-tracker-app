import React, { useState } from 'react';
import {
  WaterConsumptionAddModal,
  WaterConsumptionEditModal,
} from '../../WaterConsumptionModals/WaterConsumptionModals.jsx';

export const TodayWaterConsumption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState(false);

  const openModal = e => {
    setIsOpen(true);
    setAction(e);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {action === 'add' && (
        <WaterConsumptionAddModal isOpen={isOpen} onRequestClose={closeModal} />
      )}
      {action === 'edit' && (
        <WaterConsumptionEditModal
          isOpen={isOpen}
          onRequestClose={closeModal}
        />
      )}
      <button onClick={() => openModal('edit')}>Edit Water</button>
      <button onClick={() => openModal('add')}> Add Water</button>
    </>
  );
};
