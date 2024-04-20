import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { DailyNorma } from './DailyNorma/DailyNorma';
import { ImageOfBottle } from './ImageOfBottle/ImageOfBottle';
import { WaterRatioPanel } from './WaterRatioPanel/WaterRatioPanel';
import { TodayAndMonthLayout } from './TodayAndMonthLayout/TodayAndMonthLayout';

import {
  StyledContainer,
  LeftSideDiv,
  StyledSection,
} from './DashboardLayout.styled';
import { getConsumptionForToday } from 'store/operations';
import { notify } from 'notify';

export const DashboardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConsumptionForToday())
      .unwrap()
      .catch(() =>
        notify(
          'There was an error loading water consumption for today, please try again later',
          'error'
        )
      );
  }, [dispatch]);

  return (
    <StyledSection>
      <StyledContainer>
        <LeftSideDiv>
          <DailyNorma />
          <ImageOfBottle />
          <WaterRatioPanel />
        </LeftSideDiv>

        <TodayAndMonthLayout />
      </StyledContainer>
    </StyledSection>
  );
};
