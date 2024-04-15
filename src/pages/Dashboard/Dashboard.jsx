import { DailyNorma } from 'components/DashboardComponents/DailyNorma/DailyNorma';
import { AllSidesDiv, LeftSideDiv, StyledBackground } from './Dashboard.styled';
import { ImageOfBottle } from 'components/DashboardComponents/ImageOfBottle/ImageOfBottle';
import WaterRatioPanel from 'components/DashboardComponents/WaterRatioPanel/WaterRatioPanel';
import TodayAndMonthLayout from 'components/DashboardComponents/TodayAndMonthLayout/TodayAndMonthLayout';
import { Container } from 'components';

export default function Dashboard() {
  return (
    <StyledBackground>
      <Container>
        <AllSidesDiv>
          <LeftSideDiv>
            <DailyNorma />
            <ImageOfBottle />
            <WaterRatioPanel />
          </LeftSideDiv>
          <TodayAndMonthLayout />
        </AllSidesDiv>
      </Container>
    </StyledBackground>
  );
}
