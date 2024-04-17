import { useState } from 'react';

import { Container } from 'components';

import { ConfirmActionWarningModal } from 'components';

export const DeleteEntryModalExample = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <button type="button" onClick={() => setIsOpen(true)}>
        Delete
      </button>

      <ConfirmActionWarningModal
        modalIsOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        actionCallBack={() => {
          setIsOpen(false);
          // Delete endpoint call
        }}
        title="Delete entry"
        confirmMessage="Are you sure you want to delete the entry?"
        actionButtonName="Delete"
      />
    </Container>
  );
};
