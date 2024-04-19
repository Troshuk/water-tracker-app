import { MonthStatsTable } from 'components';
import css from './TodayAndMonthLayout.module.css';

export const TodayAndMonthLayout = () => {
  return (
    <div className={css.card}>
      <div>TodayLayout</div>
      <MonthStatsTable />
    </div>
  );
};
