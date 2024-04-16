import { Container, Icon } from 'components';

import css from './TodayWaterList.module.css';

export const TodayWaterList = () => {
  return (
    <Container className={css.todayWaterContainer}>
      <h1>Today</h1>
      <button className={css.addWaterBtn} type="button">
        <Icon
          className={css.todayWaterIcon}
          id="icon-plus-small"
          width="24"
          height="24"
        />
        Add water
      </button>
      <ul className={css.todayWaterList}>
        <li className={css.todayWaterItem}>
          <Icon className={css.todayWaterIcon} id="" width="33" height="36" />
          <span>250 ml</span>
          <span>7:00 AM</span>

          <div className={css.changeWaterIconThumb}>
            <Icon className={css.editWaterIcon} id="" width="33" height="36" />
            <Icon
              className={css.deleteWaterIcon}
              id=""
              width="33"
              height="36"
            />
          </div>
        </li>
      </ul>
    </Container>
  );
};
