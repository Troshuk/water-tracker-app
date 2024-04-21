import { useEffect, useState } from 'react';
import {
  TitleWrapper,
  MonthText,
  SvgIcon,
  MonthYearText,
  LiItem,
  LiCircle,
  Ul,
  ProcentageWater,
} from './MonthStatsTable.styled.js';
import PopUpCard from './PopUp/PopUp';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';

import { getMonthPercentageThunk } from 'store/waterCalendar/operations.js';
import { selectMonthPercentage } from 'store/waterCalendar/selectors.js';

export const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const percentagePerMonth = useSelector(selectMonthPercentage);

  const [todayDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
  const month = currentDate.getMonth() + 1;

  useEffect(() => {
    dispatch(getMonthPercentageThunk(`${currentYear}-${month}`));
  }, [month, currentYear, dispatch]);

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    setCurrentDate(previousMonth);
    if (currentDate.getMonth() === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentDate.getMonth() === 11) {
      setCurrentYear(currentYear + 1);
    }
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    if (
      currentDate.getFullYear() < todayDate.getFullYear() ||
      (currentDate.getFullYear() === todayDate.getFullYear() &&
        currentDate.getMonth() < todayDate.getMonth())
    ) {
      setCurrentDate(nextMonth);
    }
  };

  return (
    <>
      <TitleWrapper>
        <button>UPDATE</button>
        <MonthText>Month</MonthText>
        <div>
          <SvgIcon onClick={goToPreviousMonth} width={6} height={10}>
            &lt;
          </SvgIcon>
          <MonthYearText>
            {monthName}, {currentYear}
          </MonthYearText>
          <SvgIcon onClick={goToNextMonth} width={6} height={10}>
            &gt;
          </SvgIcon>
        </div>
      </TitleWrapper>
      <Ul>
        {percentagePerMonth.length > 0 &&
          percentagePerMonth.map(
            ({ waterRate, date, percentOfWaterRate, recordsCount }) => {
              return (
                <Popup
                  style={{ width: '280px' }}
                  key={date}
                  trigger={
                    <LiItem>
                      <LiCircle percentage={percentOfWaterRate}>
                        {parseInt(date)}
                      </LiCircle>
                      <ProcentageWater>
                        {percentOfWaterRate ? percentOfWaterRate : 0}%
                      </ProcentageWater>
                    </LiItem>
                  }
                  position={[
                    'top left',
                    'top right',
                    'center center',
                    'right center',
                  ]}
                  on="click"
                  closeOnDocumentClick
                  keepTooltipInside={true}
                  arrow={false}
                  offsetX={8}
                  offsetY={8}
                >
                  <PopUpCard
                    date={date}
                    waterRate={waterRate}
                    percentOfWaterRate={percentOfWaterRate}
                    recordsCount={recordsCount}
                  />
                </Popup>
              );
            }
          )}
      </Ul>
    </>
  );
};
