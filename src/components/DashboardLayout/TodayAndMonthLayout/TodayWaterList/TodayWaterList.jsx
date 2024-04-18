import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'components';
import { ConfirmActionWarningModal } from 'components';
import css from './TodayWaterList.module.css';
import {
  deleteConsumptionRecord,
  getConsumptionForToday,
} from 'store/operations';

const water = [
  {
    // id: '',
    icon: 'water-glass',
    value: ' ',
    consumed_at: ' ',
    editBtn: { icon: 'icon-pencil-square' },
    deleteBtn: { icon: 'icon-trash' },
  },
  {
    id: '',
    icon: 'water-glass',
    value: ' ',
    consumed_at: ' ',
    editBtn: { icon: 'icon-pencil-square' },
    deleteBtn: { icon: 'icon-trash' },
  },
  {
    id: '',
    icon: 'water-glass',
    value: ' ',
    consumed_at: ' ',
    editBtn: { icon: 'icon-pencil-square' },
    deleteBtn: { icon: 'icon-trash' },
  },
  {
    id: '',
    icon: 'water-glass',
    value: ' ',
    consumed_at: ' ',
    editBtn: { icon: 'icon-pencil-square' },
    deleteBtn: { icon: 'icon-trash' },
  },
  {
    id: '',
    icon: 'water-glass',
    value: ' ',
    consumed_at: ' ',
    editBtn: { icon: 'icon-pencil-square' },
    deleteBtn: { icon: 'icon-trash' },
  },
];

export const TodayWaterList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConsumptionForToday());
  }, [dispatch]);

  const handleDeleteConsumption = id => {
    dispatch(deleteConsumptionRecord(id));
  };

  return (
    <div className={css.todayWaterContainer}>
      <p className={css.todayTitle}>Today</p>
      <ul className={css.todayWaterList}>
        {water.map((water, id) => (
          <li className={css.todayWaterItem} key={id}>
            <div className={css.waterInfoThumb}>
              <Icon
                className={css.todayWaterIcon}
                id={water.icon}
                width="26"
                height="26"
              />
              <span className={css.waterValue}>{water.value}200 ml</span>

              <span className={css.waterTime}>{water.consumed_at}12:00 AM</span>
            </div>

            <div className={css.changeWaterIconThumb}>
              <button className={css.editWaterBtn} type="button">
                <Icon
                  className={css.editWaterIcon}
                  id={water.editBtn.icon}
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
                  id={water.deleteBtn.icon}
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
