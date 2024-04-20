import ReactModal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import css from './WaterConsumptionModals.module.css';
import { useDispatch } from 'react-redux';
import { createConsumptionRecord } from '../../../store/water/operations.js';
// import { createConsumptionRecordSelector } from '../../../store/water/selectors.jsx';

ReactModal.setAppElement('#root');

const getCurrentTime = () => {
  const today = new Date();
  const roundedMinutes = Math.round(today.getMinutes() / 5.0) * 5;
  const formattedMinutes = String(roundedMinutes).padStart(2, '0');

  const closes = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    formattedMinutes
  );
  // console.log('closes', closes.toISOString());
  return closes.toISOString();
};

// Генеруємо варіанти часу з інтервалом 5 хвилин
const generateTimeOptions = () => {
  const options = [];
  const today = new Date();
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const time = `${String(hour).padStart(1, '0')}:${String(minute).padStart(
        2,
        '0'
      )}`;
      const dateTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour,
        minute
      );
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

const currentTime = getCurrentTime();

export const WaterConsumptionAddModal = ({ isOpen, onRequestClose }) => {
  const [selectedTime, setSelectedTime] = useState(currentTime);
  const [consumedValue, setConsumedValue] = useState(Number(50));
  const [changedConsumedValue, setChangedConsumedValue] = useState(Number(50));

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedTime(getCurrentTime());
  }, []);

  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
  };
  const changeConsumedValue = e => {
    console.log(e);
    const num = Number(e.target.value);
    num >= 0 && num <= 5000
      ? setChangedConsumedValue(num)
      : setConsumedValue(changedConsumedValue);
  };

  const handleValueChange = e => {
    setConsumedValue(e.target.value);
  };

  const plus50ml = () => {
    const value = Number(consumedValue);
    setConsumedValue(value + 50 <= 5000 ? value + 50 : value);
    setChangedConsumedValue(value + 50 <= 5000 ? value + 50 : value);
  };

  const minus50ml = () => {
    const value = Number(consumedValue);
    setConsumedValue(value - 50 >= 0 ? value - 50 : value);
    setChangedConsumedValue(value - 50 >= 0 ? value - 50 : value);
  };

  const handleSubmit = () => {
    dispatch(
      createConsumptionRecord({
        value: changedConsumedValue,
        consumed_at: new Date(selectedTime).toISOString(),
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
              {selectedTime},{generateTimeOptions()}
            </select>
          </div>
          <div className={css.container_select}>
            <label className={css.label_value} htmlFor="value">
              Enter the value of the water used:
            </label>
            <input
              type="number"
              className={css.select_time_value}
              onChange={handleValueChange}
              onBlur={changeConsumedValue}
              value={consumedValue}
              min={0}
            />
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
