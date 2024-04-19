import { useSelector } from 'react-redux';

import {
  RangeAndAddWater,
  RangeDiv,
  RangeTitle,
  StyledRangeInput,
  PercentageDiv,
  PercentageOfRange,
  BoldPercentageOfRange,
  ButtonAddWater,
  SvgButton,
} from './WaterRatioPanel.styled';

import { todayConsumptionPercentageSelector } from 'store/selectors.js';

import iconSprite from 'images/icons.svg';

export const WaterRatioPanel = () => {
  const consumptionPercentage = useSelector(todayConsumptionPercentageSelector);

  const sliderStyle = {
    background: `linear-gradient(to right, #9EBBFF ${consumptionPercentage}%, #D7E3FF ${consumptionPercentage}%)`,
  };

  return (
    <RangeAndAddWater>
      <RangeDiv>
        <RangeTitle>Today</RangeTitle>
        <StyledRangeInput
          type="range"
          value={consumptionPercentage}
          style={sliderStyle}
          min="0"
          max="100"
          readOnly={true}
        />
        <PercentageDiv>
          <PercentageOfRange>0%</PercentageOfRange>
          <PercentageOfRange>
            <BoldPercentageOfRange>50%</BoldPercentageOfRange>
          </PercentageOfRange>
          <PercentageOfRange>100%</PercentageOfRange>
        </PercentageDiv>
      </RangeDiv>
      <ButtonAddWater>
        <SvgButton>
          <use href={iconSprite + '#icon-plus-circle'} />
        </SvgButton>
        Add Water
      </ButtonAddWater>
    </RangeAndAddWater>
  );
};
