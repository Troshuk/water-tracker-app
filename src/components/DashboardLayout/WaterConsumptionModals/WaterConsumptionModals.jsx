import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoader, Icon } from 'components';
import {
  createConsumptionRecord,
  updateConsumptionRecord,
} from 'store/operations';
import {
  createConsumptionRecordSelector,
  viewingDateSelector,
} from 'store/selectors';
import { notifyApi } from 'notify';

import css from './WaterConsumptionModals.module.css';
import moment from 'moment';

ReactModal.setAppElement('#root');

const getCurrentTime = viewingDate => {
  const today = new Date();
  const roundedMinutes = Math.round(today.getMinutes() / 5.0) * 5;
  const formattedMinutes = String(roundedMinutes).padStart(2, '0');
  const currentDate = viewingDate ? new Date(viewingDate) : today;

  const closes = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    today.getHours(),
    formattedMinutes
  );
  return closes.toISOString();
};

const formatTimeLt = inDate => {
  inDate ||= new Date();
  return moment(inDate).format('h:mm A').toString();
};

const generateTimeOptions = viewingDate => {
  const options = [];
  const today = viewingDate ? new Date(viewingDate) : new Date();
  const step = 5;

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      const dateTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour,
        minute
      );
      const time = formatTimeLt(dateTime);
      const dateOption = dateTime.toISOString();
      options.push(
        <option key={dateOption} value={dateOption}>
          {time}
        </option>
      );
    }
  }
  return options;
};

const MAX_VALUE = 5000;
const MIN_VALUE = 0;

export const WaterConsumptionAddModal = ({ isOpen, onRequestClose }) => {
  const [selectedTime, setSelectedTime] = useState(getCurrentTime(null));
  const [changedConsumedValue, setChangedConsumedValue] = useState(Number(50));
  const { isLoading } = useSelector(createConsumptionRecordSelector);
  const viewingDate = useSelector(viewingDateSelector);

  useEffect(() => {
    setSelectedTime(getCurrentTime(viewingDate || null));
  }, [viewingDate]);

  const dispatch = useDispatch();

  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
  };

  const handleSetConsumedValue = value => {
    if (value > MAX_VALUE) {
      setChangedConsumedValue(MAX_VALUE);
    } else if (value < MIN_VALUE) {
      setChangedConsumedValue(MIN_VALUE);
    } else {
      setChangedConsumedValue(value);
    }
  };

  const changeConsumedValue = e => {
    const num = Number(e.target.value);
    e.target.value = num;
    handleSetConsumedValue(num);
  };

  const plus50ml = () => {
    const value = Number(changedConsumedValue);
    handleSetConsumedValue(value + 50);
  };

  const minus50ml = () => {
    const value = Number(changedConsumedValue);
    handleSetConsumedValue(value - 50);
  };

  const handleSubmit = () => {
    notifyApi(
      dispatch(
        createConsumptionRecord({
          value: changedConsumedValue,
          consumed_at: new Date(selectedTime).toISOString(),
        })
      )
        .unwrap()
        .then(onRequestClose),
      'Adding some water',
      true
    );
  };

  useEffect(() => {
    handleSetConsumedValue(changedConsumedValue);
  }, [changedConsumedValue]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={{
        base: css.modal,
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
      <div className={css.containerModalAdd}>
        <div className={css.topContainer}>
          <h2 className={css.title}>
            Add water{viewingDate && ` for ${moment(viewingDate).format('LL')}`}
          </h2>
          <button
            type="button"
            className={css.btn_close}
            onClick={onRequestClose}
          >
            <Icon
              id="icon-close-x"
              width="14"
              height="14"
              className={css.closeIcon}
            />
          </button>
        </div>
        <h3 className={css.chooseValue}>Choose a value:</h3>
        <p className={css.amount}>Amount of water:</p>
        <div>
          <div className={css.addPanel}>
            <button className={css.plus_minus} onClick={minus50ml}>
              <Icon
                className={css.little_plus_minus}
                id="minus"
                width="24"
                height="24"
              />
            </button>
            <span className={css.amount_to_add}>{changedConsumedValue}ml</span>
            <button className={css.plus_minus} onClick={plus50ml}>
              <Icon
                className={css.little_plus_minus}
                id="plus"
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className={css.container_select}>
            <label className={css.label_time} htmlFor="time">
              Recording time:
            </label>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className={css.select_time_value}
            >
              {selectedTime},{generateTimeOptions(viewingDate)}
            </select>
          </div>
          <div className={css.container_select}>
            <label className={css.label_value} htmlFor="value">
              Enter the value of the water used:
            </label>
            <input
              type="number"
              className={css.select_time_value}
              onChange={changeConsumedValue}
              onBlur={changeConsumedValue}
              value={changedConsumedValue}
              min={0}
            />
          </div>
          <div className={css.container_save}>
            <span className={css.value_save}>{changedConsumedValue}ml</span>
            <button onClick={handleSubmit} className={css.btn_sav}>
              Save {isLoading && <ContentLoader />}
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const WaterConsumptionEditModal = ({
  isOpen,
  id,
  value,
  consumed_at,
  onRequestClose,
}) => {
  const [selectedTime, setSelectedTime] = useState(consumed_at);
  const [changedConsumedValue, setChangedConsumedValue] = useState(value);
  const { isLoading } = useSelector(createConsumptionRecordSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    setChangedConsumedValue(value);
    setSelectedTime(consumed_at);
  }, [value, consumed_at]);

  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
  };

  const handleSetConsumedValue = value => {
    if (value > MAX_VALUE) {
      setChangedConsumedValue(MAX_VALUE);
    } else if (value < MIN_VALUE) {
      setChangedConsumedValue(MIN_VALUE);
    } else {
      setChangedConsumedValue(value);
    }
  };

  const changeConsumedValue = e => {
    const num = Number(e.target.value);
    handleSetConsumedValue(num);
  };

  const plus50ml = () => {
    const value = Number(changedConsumedValue);
    handleSetConsumedValue(value + 50);
  };

  const minus50ml = () => {
    const value = Number(changedConsumedValue);
    handleSetConsumedValue(value - 50);
  };

  const handleSubmit = id => {
    const updatedData = {
      value: changedConsumedValue,
      consumed_at: new Date(selectedTime).toISOString(),
    };
    notifyApi(
      dispatch(updateConsumptionRecord({ id, updatedData }))
        .unwrap()
        .then(onRequestClose),
      'Adding some water',
      true
    );
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={{
        base: css.modal,
        afterOpen: css.modalContentAfterOpen,
        beforeClose: css.modalContentBeforeClose,
      }}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <div className={css.containerModalEdit}>
        <div className={css.topContainer}>
          <h2 className={css.title}>Edit the entered amount of water</h2>
          <button
            type="button"
            className={css.btn_close}
            onClick={onRequestClose}
          >
            <Icon
              id="icon-close-x"
              width="14"
              height="14"
              className={css.closeIcon}
            />
          </button>
        </div>
        <div className={css.last_consumed}>
          <span className={css.last_glass}>
            <Icon
              id="water-glass"
              className={css.last_glass}
              width="36"
              height="36"
            />
          </span>
          <span className={css.last_value}>{value} ml</span>
          <span className={css.last_time}>{formatTimeLt(consumed_at)}</span>
        </div>
        <h3 className={css.chooseValue}>Correct entered data:</h3>
        <p className={css.amount}>Amount of water:</p>
        <div>
          <div className={css.addPanel}>
            <button className={css.plus_minus} onClick={minus50ml}>
              <Icon
                className={css.little_plus_minus}
                id="minus"
                width="24"
                height="24"
              />
            </button>
            <span className={css.amount_to_add}>{changedConsumedValue}ml</span>
            <button className={css.plus_minus} onClick={plus50ml}>
              <Icon
                className={css.little_plus_minus}
                id="plus"
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className={css.container_select}>
            <label className={css.label_time} htmlFor="time">
              Recording time:
            </label>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className={css.select_time_value_edit}
            >
              {selectedTime},{generateTimeOptions(consumed_at)}
            </select>
          </div>
          <div className={css.container_select}>
            <label className={css.label_value} htmlFor="value">
              Enter the value of the water used:
            </label>
            <input
              type="number"
              className={css.select_time_value_edit}
              onChange={changeConsumedValue}
              onBlur={changeConsumedValue}
              value={changedConsumedValue}
              min={0}
            />
          </div>
          <div className={css.container_save}>
            <span className={css.value_save}>{changedConsumedValue}ml</span>
            <button onClick={() => handleSubmit(id)} className={css.btn_sav}>
              Save {isLoading && <ContentLoader />}
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
