import { useState } from 'react';
import { Icon } from 'components';
import { ConfirmActionWarningModal } from 'components';
import css from './TodayWaterList.module.css';

export const TodayWaterList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <div className={css.todayWaterContainer}>
      <p className={css.todayTitle}>Today</p>
      <ul className={css.todayWaterList}>
        <li className={css.todayWaterItem}>
          <div className={css.waterInfoThumb}>
            <Icon
              className={css.todayWaterIcon}
              id="water-glass"
              width="26"
              height="26"
            />
            <span className={css.waterValue}>250 ml</span>
            <span className={css.waterTime}>14:00 AM</span>
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
                // Delete endpoint call
              }}
              title="Delete entry"
              confirmMessage="Are you sure you want to delete the entry?"
              actionButtonName="Delete"
            />
          </div>
        </li>
        <li className={css.todayWaterItem}>
          <div className={css.waterInfoThumb}>
            <Icon
              className={css.todayWaterIcon}
              id="water-glass"
              width="26"
              height="26"
            />
            <span className={css.waterValue}>250 ml</span>
            <span className={css.waterTime}>14:00 AM</span>
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

            <button className={css.deleteWaterBtn} type="button">
              <Icon
                className={css.deleteWaterIcon}
                id="icon-trash"
                width="16"
                height="16"
              />
            </button>
          </div>
        </li>
        <li className={css.todayWaterItem}>
          <div className={css.waterInfoThumb}>
            <Icon
              className={css.todayWaterIcon}
              id="water-glass"
              width="26"
              height="26"
            />
            <span className={css.waterValue}>250 ml</span>
            <span className={css.waterTime}>14:00 AM</span>
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

            <button className={css.deleteWaterBtn} type="button">
              <Icon
                className={css.deleteWaterIcon}
                id="icon-trash"
                width="16"
                height="16"
              />
            </button>
          </div>
        </li>
        <li className={css.todayWaterItem}>
          <div className={css.waterInfoThumb}>
            <Icon
              className={css.todayWaterIcon}
              id="water-glass"
              width="26"
              height="26"
            />
            <span className={css.waterValue}>250 ml</span>
            <span className={css.waterTime}>14:00 AM</span>
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

            <button className={css.deleteWaterBtn} type="button">
              <Icon
                className={css.deleteWaterIcon}
                id="icon-trash"
                width="16"
                height="16"
              />
            </button>
          </div>
        </li>
        <li className={css.todayWaterItem}>
          <div className={css.waterInfoThumb}>
            <Icon
              className={css.todayWaterIcon}
              id="water-glass"
              width="26"
              height="26"
            />
            <span className={css.waterValue}>250 ml</span>
            <span className={css.waterTime}>14:00 AM</span>
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

            <button className={css.deleteWaterBtn} type="button">
              <Icon
                className={css.deleteWaterIcon}
                id="icon-trash"
                width="16"
                height="16"
              />
            </button>
          </div>
        </li>
        <li className={css.todayWaterItem}>
          <div className={css.waterInfoThumb}>
            <Icon
              className={css.todayWaterIcon}
              id="water-glass"
              width="26"
              height="26"
            />
            <span className={css.waterValue}>250 ml</span>
            <span className={css.waterTime}>14:00 AM</span>
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

            <button className={css.deleteWaterBtn} type="button">
              <Icon
                className={css.deleteWaterIcon}
                id="icon-trash"
                width="16"
                height="16"
              />
            </button>
          </div>
        </li>
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
