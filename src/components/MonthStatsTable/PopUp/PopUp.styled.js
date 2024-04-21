import styled from 'styled-components';

export const PopUpWrap = styled.div`
  width: 280px;
  padding: 24px 13px;
  background-color: var(--primary-color-white);
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(64, 123, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
  @media screen and (min-width: 768px) {
    width: 292px;
  }
`;

export const DateText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  color: var(--primary-color-blue);
`;

export const WaterInfo = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  color: var(--primary-color-black);
`;

export const AccentColor = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.3;
  color: var(--primary-color-blue);
`;
