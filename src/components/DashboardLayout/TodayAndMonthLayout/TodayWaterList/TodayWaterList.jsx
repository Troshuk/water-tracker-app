import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ConfirmActionWarningModal, Icon } from 'components';

import { deleteConsumptionRecord } from 'store/operations';
import { todayConsumptionsSelector } from 'store/selectors';

import css from './TodayWaterList.module.css';

export const TodayWaterList = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);

  const water = useSelector(todayConsumptionsSelector);

  const handleDeleteConsumption = id => {
    dispatch(deleteConsumptionRecord(id));
  };

  const formatTime = date =>
    new Date(date).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  return (
    <div className={css.todayWaterContainer}>
      <p className={css.todayTitle}>Today</p>
      <ul className={css.todayWaterList}>
        {water?.map(water => (
          <li className={css.todayWaterItem} key={water.id}>
            <div className={css.waterInfoThumb}>
              <Icon
                className={css.todayWaterIcon}
                id="water-glass"
                width="26"
                height="26"
              />
              <span className={css.waterValue}>{water.value} ml</span>

              <span className={css.waterTime}>
                {formatTime(water.consumed_at)}
              </span>
            </div>

            <div className={css.changeWaterIconThumb}>
              <button className={css.editWaterBtn} type="button">
                <Icon
                  className={css.editWaterIcon}
                  id="icon-pencil-square"
                  width="16"
                  height="16"
                />
              </button>
              <button
                className={css.deleteWaterBtn}
                type="button"
                onClick={() => setIsOpen(true)}
              >
                <Icon
                  className={css.deleteWaterIcon}
                  id="icon-trash"
                  width="16"
                  height="16"
                />
              </button>
              <ConfirmActionWarningModal
                modalIsOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
                actionCallBack={() => {
                  setIsOpen(false);
                  handleDeleteConsumption(water.id);
                  // Delete endpoint call
                }}
                title="Delete entry"
                confirmMessage="Are you sure you want to delete the entry?"
                actionButtonName="Delete"
              />
            </div>
          </li>
        ))}
      </ul>
      <div className={css.addWaterThumb}>
        <button className={css.addWaterBtn} type="button">
          <Icon
            className={css.plusWaterIcon}
            id="icon-plus-small"
            width="16"
            height="16"
          />
          Add water
        </button>
      </div>
    </div>
  );
};
