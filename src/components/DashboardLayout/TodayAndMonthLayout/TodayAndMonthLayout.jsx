import { TodayWaterList } from './TodayWaterList/TodayWaterList';

import css from './TodayAndMonthLayout.module.css';
import { TodayWaterConsumption } from './TodayWaterConsumption';

export const TodayAndMonthLayout = () => {
  return (
    <div className={css.card}>
      <TodayWaterList />
      <div>MonthLayout</div>
      <TodayWaterConsumption />
    </div>
  );
};
