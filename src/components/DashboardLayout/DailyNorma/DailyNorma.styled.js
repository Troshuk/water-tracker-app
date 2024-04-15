import styled from 'styled-components';

export const Wrap = styled.div`
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #ecf2ff;
  background: rgb(255, 255, 255);
  box-shadow: 0 4px 8px 0 rgba(158, 187, 255, 0.12);
  padding: 8px 20px;
  margin-bottom: 8px;
  position: static;

  @media (min-width: 768px) {
    position: absolute;
    /* height: 76px; */
  }
`;

export const Text = styled.p`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto';
  line-height: 1.3;
  color: #2f2f2f;
`;

export const TextWater = styled.p`
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 700;
  line-height: 1;
  color: #407bff;
`;

export const Button = styled.button`
  padding: 0;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 1.3;
  color: #8baeff;
  border: none;
  background-color: #ffffff;
  outline: none;
  span {
    color: transparent;
    overflow: hidden;

    background: linear-gradient(
      90deg,
      #ff9d43 0%,
      #ff9d43 50%,
      #407bff 50%,
      #407bff 100%
    );

    background-size: 200% 100%;
    background-position: 100%;

    -webkit-background-clip: text;
    background-clip: text;

    transition: 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
  }

  &:hover {
    & span {
      background-position: 0 100%;
    }
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: baseline;
`;
