import { DailyNorma } from './DailyNorma/DailyNorma';
import { ImageOfBottle } from './ImageOfBottle/ImageOfBottle';
import WaterRatioPanel from './WaterRatioPanel/WaterRatioPanel';
import TodayAndMonthLayout from './TodayAndMonthLayout/TodayAndMonthLayout';

import {
  StyledContainer,
  LeftSideDiv,
  StyledSection,
} from './DashboardLayout.styled';

export const DashboardLayout = () => {
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
