import React from 'react';

import iconSprite from '../../../images/icons.svg';

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

import { todayConsumptionPercentageSelector } from '../../../store/water/selectors.js';
import { useSelector } from 'react-redux';

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
        ></StyledRangeInput>
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
