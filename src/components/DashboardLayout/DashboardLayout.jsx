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

export const DashboardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConsumptionForToday());
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
