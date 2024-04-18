import css from './TodayAndMonthLayout.module.css';
import { TodayWaterConsumption } from './TodayWaterConsumption';

export const TodayAndMonthLayout = () => {
  return (
    <div className={css.card}>
      <div>TodayLayout</div>
      <div>MonthLayout</div>
      <TodayWaterConsumption />
    </div>
  );
};
