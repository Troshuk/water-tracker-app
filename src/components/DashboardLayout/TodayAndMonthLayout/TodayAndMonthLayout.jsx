import { MonthStatsTable } from 'components';
import { TodayWaterList } from './TodayWaterList/TodayWaterList';

import css from './TodayAndMonthLayout.module.css';

export const TodayAndMonthLayout = () => {
  return (
    <div className={css.card}>
      <TodayWaterList />
      <MonthStatsTable />
    </div>
  );
};
