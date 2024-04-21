import { PopUpWrap, DateText, WaterInfo, AccentColor } from './PopUp.styled';

const PopUpCard = ({ waterRate, date, percentOfWaterRate, recordsCount }) => {
  return (
    <PopUpWrap>
      <DateText>{date}</DateText>
      <WaterInfo>
        Daily norma: <AccentColor>{waterRate ? waterRate : 0} L</AccentColor>
      </WaterInfo>
      <WaterInfo>
        Fulfillment of the daily norm:{' '}
        <AccentColor>
          {percentOfWaterRate ? percentOfWaterRate : 0}%
        </AccentColor>
      </WaterInfo>
      <WaterInfo>
        How many servings of water: <AccentColor>{recordsCount}</AccentColor>
      </WaterInfo>
    </PopUpWrap>
  );
};

export default PopUpCard;
