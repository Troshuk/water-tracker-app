import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

export const MonthText = styled.h3`
  font-weight: 500;
  font-size: 24px;
  line-height: 1.25;
  color: var(--primary-color-black);
  @media screen and (min-width: 768px) {
    font-size: 26px;
  }
`;

export const SvgIcon = styled.svg`
  fill: var(--primary-color-blue);
  cursor: pointer;
`;

export const MonthYearText = styled.span`
  padding: 0 16px;
  font-size: 16px;
  line-height: 1.25;
  color: var(--primary-color-blue);
  width: 140px;
  display: inline-block;
  text-align: center;
`;

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 26px;
  margin-top: 16px;
  position: relative;
  @media screen and (min-width: 768px) {
    gap: 20px 34px;
  }
  @media screen and (min-width: 1440px) {
    gap: 20px 22px;
  }
`;

export const LiItem = styled.li`
  cursor: pointer;
  @media screen and (min-width: 768px) {
    position: relative;
  }
  @media screen and (min-width: 1440px) {
    position: relative;
  }
`;
export const LiCircle = styled.div`
  border: 1px solid
    ${props =>
      props.percentage < 100
        ? `${'var(--secondary-color-orange)'}`
        : 'transperent'};
  width: 32px;
  height: 32px;
  border-radius: 20px;
  background-color: var(--primary-color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.28571;
  color: var(--primary-color-black);
  @media screen and (min-width: 768px) {
    width: 34px;
    height: 34px;
  }
`;

export const ProcentageWater = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  line-height: 1.6;
  color: var(--secondary-color-blue-2);
  text-align: center;
  margin-top: 4px;
`;
