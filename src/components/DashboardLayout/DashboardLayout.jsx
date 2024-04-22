import { useDispatch, useSelector } from 'react-redux';
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
import {
  createConsumptionRecordSelector,
  deleteConsumptionRecordSelector,
  updateConsumptionRecordSelector,
  updateWaterGoalSelector,
} from 'store/selectors';

export const DashboardLayout = () => {
  const dispatch = useDispatch();
  const deletingWater = useSelector(deleteConsumptionRecordSelector);
  const creatingWater = useSelector(createConsumptionRecordSelector);
  const updatingWater = useSelector(updateConsumptionRecordSelector);
  const updatingWaterGoal = useSelector(updateWaterGoalSelector);

  // Re-fetch water for today when any of these actions happened
  useEffect(() => {
    if (
      !deletingWater.isLoading &&
      !deletingWater.error &&
      !creatingWater.isLoading &&
      !creatingWater.error &&
      !updatingWater.isLoading &&
      !updatingWater.error &&
      !updatingWaterGoal.isLoading &&
      !updatingWaterGoal.error
    ) {
      dispatch(getConsumptionForToday())
        .unwrap()
        .catch(() =>
          notify(
            'There was an error loading water consumption for today, please try again later',
            'error'
          )
        );
    }
  }, [
    dispatch,
    deletingWater,
    creatingWater,
    updatingWater,
    updatingWaterGoal,
  ]);

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
