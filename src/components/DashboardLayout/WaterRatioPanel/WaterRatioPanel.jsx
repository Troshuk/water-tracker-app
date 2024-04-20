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
import { useState } from 'react';
import { WaterConsumptionAddModal } from '../WaterConsumptionModals/WaterConsumptionModals';

export const WaterRatioPanel = () => {
  const consumptionPercentage = useSelector(todayConsumptionPercentageSelector);
  const [isOpen, setIsOpen] = useState(false);

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
      <ButtonAddWater onClick={() => setIsOpen(true)}>
        <SvgButton>
          <use href={iconSprite + '#icon-plus-circle'} />
        </SvgButton>
        Add Water
      </ButtonAddWater>
      <WaterConsumptionAddModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </RangeAndAddWater>
  );
};
