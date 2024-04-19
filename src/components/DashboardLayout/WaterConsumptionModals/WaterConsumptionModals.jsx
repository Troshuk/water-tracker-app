import ReactModal from 'react-modal';
import { useState } from 'react';
import { Icon } from 'components';
import css from './WaterConsumptionModals.module.css';
import { useDispatch } from 'react-redux';
import { createConsumptionRecord } from '../../../store/water/operations.js';
// import { createConsumptionRecordSelector } from '../../../store/water/selectors.jsx';

ReactModal.setAppElement('#root');

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Генеруємо варіанти часу з інтервалом 5 хвилин
const generateTimeOptions = () => {
  const options = [];
  const today = new Date();
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const DateOption = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour,
        minute
      ).toISOString();
      const time = `${String(hour).padStart(1, '0')}:${String(minute).padStart(
        2,
        '0'
      )}`;
      options.push(
        <option key={DateOption} value={DateOption}>
          {time}
        </option>
      );
    }
  }
  return options;
};

export const WaterConsumptionAddModal = ({ isOpen, onRequestClose }) => {
  const [selectedTime, setSelectedTime] = useState(getCurrentTime());
  const [consumedValue, setConsumedValue] = useState(0);
  const [changedConsumedValue, setchangedConsumedValue] = useState('0');

  const dispatch = useDispatch();

  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
  };
  const handleValueChange = e => {
    setConsumedValue(e.target.value);
  };
  const changeConsumedValue = () => {
    setchangedConsumedValue(consumedValue);
  };
  const handleSubmit = () => {
    dispatch(
      createConsumptionRecord({
        value: changedConsumedValue,
        consumed_at: selectedTime,
      })
    );
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={css.modal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <div className={css.containerModalAdd}>
        <div className={css.topContainer}>
          <h2 className={css.title}>Add water</h2>
          <button
            type="button"
            className={css.btn_close}
            onClick={onRequestClose}
          >
            <Icon id="close" width="24" height="24" />
          </button>
        </div>
        <h3 className={css.chooseValue}>Choose a value:</h3>
        <p className={css.amount}>Amount of water:</p>
        <div>
          <div className={css.addPanel}>
            <button className={css.plus_minus}>
              <Icon
                className={css.little_plus_minus}
                id="minus"
                width="24"
                height="24"
              />
            </button>
            <span className={css.amount_to_add}>{changedConsumedValue}ml</span>
            <button className={css.plus_minus}>
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
              {generateTimeOptions()}
            </select>
          </div>
          <div className={css.container_select}>
            <label className={css.label_value} htmlFor="value">
              Enter the value of the water used:
            </label>
            <input
              type="input"
              className={css.select_time_value}
              onChange={handleValueChange}
              onBlur={changeConsumedValue}
              value={consumedValue}
            ></input>
          </div>
          <div className={css.container_save}>
            <span className={css.value_save}>{changedConsumedValue}ml</span>
            <button onClick={handleSubmit} className={css.btn_sav}>
              Save
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const WaterConsumptionEditModal = ({ isOpen, onRequestClose }) => {
  const [selectedTime, setSelectedTime] = useState(getCurrentTime());
  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={css.modal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
            <Icon id="close" width="24" height="24" />
          </button>
        </div>
        <div className={css.last_consumed}>
          <span className={css.last_glass}>
            <Icon id="glass-water" width="36" height="36" fill="blue" />
          </span>
          <span className={css.last_value}>250ml</span>
          <span className={css.last_time}>7:00 AM</span>
        </div>
        <h3 className={css.chooseValue}>Correct entered data:</h3>
        <p className={css.amount}>Amount of water:</p>
        <div>
          <div className={css.addPanel}>
            <button className={css.plus_minus}>
              <Icon className={css.plus} id="minus" width="24" height="24" />
            </button>
            <span className={css.amount_to_add}>50ml</span>
            <button className={css.plus_minus}>
              <Icon className={css.plus} id="plus" width="24" height="24" />
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
              {generateTimeOptions()}
            </select>
          </div>
          <div className={css.container_select}>
            <label className={css.label_value} htmlFor="value">
              Enter the value of the water used:
            </label>
            <input type="input" className={css.select_time_value_edit}></input>
          </div>
          <div className={css.container_save}>
            <span className={css.value_save}> 50ml </span>
            <button className={css.btn_sav}>Save</button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
