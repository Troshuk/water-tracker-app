import ReactModal from 'react-modal';
import styled, { keyframes } from 'styled-components';

const modalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const modalFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
`;

export const StyledReactModal = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #ffffff;
  font-weight: 400;
  color: #2f2f2f;
  padding: 24px 12px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.2;
  box-sizing: border-box;

  &.ReactModal__Content--after-open {
    animation: ${modalFadeIn} 0.3s ease-in-out forwards;
  }

  &.ReactModal__Content--before-close {
    animation: ${modalFadeOut} 0.3s ease-in-out forwards;
  }

  @media (min-width: 1440px) {
    width: 592px;
    padding: 32px 24px;
  }

  @media (min-width: 768px) and (max-width: 1439px) {
    width: 704px;
    padding: 32px 24px;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    width: 280px;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleText = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 24px;
`;

export const BtnCloseModal = styled.button`
  width: 24px;
  height: 24px;
  margin-top: 5px;
`;

export const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledRadioLabel = styled.label`
  position: relative;
  cursor: pointer;
  margin-right: 24px;
`;

export const StyledRadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const StyledRadioCircle = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleColor = styled.div`
  background-color: ${props => (props.checked ? '#007BFF' : '#fff')};
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

export const StyledRadioText = styled.span`
  margin-left: 22px;
`;

export const WrapFormulaText = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
  }
`;

export const FormulaText = styled.span`
  color: #407bff;
  font-size: 18px;
  line-height: 1.2;
`;

export const WrapFormula = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ecf2ff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 24px;
`;

export const AboutFormula = styled.p`
  color: #8f8f8f;
  font-size: 12px;
  line-height: 1.33;
  box-sizing: border-box;
`;

export const AboutFormulaColor = styled.span`
  color: #407bff;
`;

export const Text = styled.h2`
  font-size: 18px;
  line-height: 1.11;
  margin-bottom: 16px;
  font-weight: 500;
`;
export const TextInfo = styled.p`
  margin-bottom: 8px;
  margin-top: 16px;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ecf2ff;
  border-radius: 8px;
  padding: 10px;
  outline: none;
  color: #407bff;
  font-size: 16px;
  &::placeholder {
    color: #407bff;
    opacity: 1;
  }
`;

export const ValueDiv = styled.div`
  position: relative;
`;

export const ValueSpan = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  color: #407bff;
`;

export const AmountText = styled.div`
  display: flex;
  margin-top: 16px;
  margin-bottom: 24px;
  align-items: center;
`;

export const AmountTextInfo = styled.p`
  width: 190px;
  @media (min-width: 768px) {
    width: 328px;
  }
`;

export const AmountNumberInfo = styled.span`
  margin-left: 6px;
  color: #407bff;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
`;

export const Button = styled.button`
  margin-top: 24px;
  background-color: #407bff;
  border: none;
  width: 100%;
  height: 36px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(64, 123, 255, 0.34);
  transition: all 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98) 0s;

  &:hover {
    box-shadow: 0 4px 14px 0 rgba(64, 123, 255, 0.54);
  }

  &:focus {
    box-shadow: 0 4px 14px 0 rgba(64, 123, 255, 0.54);
  }

  &:active {
    box-shadow: none;
  }

  @media (min-width: 768px) {
    display: block;
    width: 160px;
    height: 44px;
    margin-left: auto;
    font-size: 18px;
  }
`;

export const MessageError = styled.div`
  color: #ef5050;
  margin-top: 4px;
  font-size: 14px;
`;
