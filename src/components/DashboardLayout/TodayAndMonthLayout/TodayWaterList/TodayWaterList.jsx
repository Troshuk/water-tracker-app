import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ConfirmActionWarningModal, Icon } from 'components';

import {
  deleteConsumptionRecord,
  getConsumptionForToday,
} from 'store/operations';
import { todayConsumptionsSelector, userSelector } from 'store/selectors';

import css from './TodayWaterList.module.css';
import { notifyApi } from 'notify';
import { notify } from 'notify';
import {
  WaterConsumptionAddModal,
  WaterConsumptionEditModal,
} from 'components/DashboardLayout/WaterConsumptionModals/WaterConsumptionModals';

const modalIsOpenInitial = { open: false, id: null };

export const TodayWaterList = () => {
  const dispatch = useDispatch();

  const [editModal, setEditModal] = useState(modalIsOpenInitial);
  const [modalIsOpen, setIsOpen] = useState(modalIsOpenInitial);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const water = useSelector(todayConsumptionsSelector);
  const { timezone: timeZone } = useSelector(userSelector);

  const handleDeleteConsumption = id => {
    notifyApi(
      dispatch(deleteConsumptionRecord(id))
        .unwrap()
        .then(() =>
          dispatch(getConsumptionForToday())
            .unwrap()
            .catch(() =>
              notify(
                'There was an error loading water consumption for today, please try again later',
                'error'
              )
            )
        ),
      'Removing water record',
      true
    );
  };

  const formatTime = date =>
    new Date(date).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone,
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
              <button
                className={css.editWaterBtn}
                type="button"
                onClick={() => setEditModal({ open: true, id: water.id })}
              >
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
                onClick={() => setIsOpen({ open: true, id: water.id })}
              >
                <Icon
                  className={css.deleteWaterIcon}
                  id="icon-trash"
                  width="16"
                  height="16"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={css.addWaterThumb}>
        <button
          className={css.addWaterBtn}
          type="button"
          onClick={() => setIsOpenCreate(true)}
        >
          <Icon
            className={css.plusWaterIcon}
            id="icon-plus-small"
            width="16"
            height="16"
          />
          Add water
        </button>
      </div>

      <ConfirmActionWarningModal
        modalIsOpen={modalIsOpen.open}
        closeModal={() => setIsOpen(modalIsOpenInitial)}
        actionCallBack={() => {
          handleDeleteConsumption(modalIsOpen.id);
          setIsOpen(modalIsOpenInitial);
        }}
        title="Delete entry"
        confirmMessage="Are you sure you want to delete the entry?"
        actionButtonName="Delete"
      />

      <WaterConsumptionEditModal
        isOpen={editModal.open}
        onRequestClose={() => setEditModal(modalIsOpenInitial)}
      />

      <WaterConsumptionAddModal
        isOpen={isOpenCreate}
        onRequestClose={() => setIsOpenCreate(false)}
      />
    </div>
  );
};
