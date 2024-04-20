import { TodayWaterList } from './TodayWaterList/TodayWaterList';

import css from './TodayAndMonthLayout.module.css';

export const TodayAndMonthLayout = () => {
  return (
    <div className={css.card}>
      <TodayWaterList />
      <div>MonthLayout</div>
    </div>
  );
};
