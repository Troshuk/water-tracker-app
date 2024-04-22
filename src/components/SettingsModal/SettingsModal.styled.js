import ReactModal from 'react-modal';
import styled from 'styled-components';

export const StModalBackdrope = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
`;

export const StyledSettingModal = styled(ReactModal)`
  &.ReactModal__Overlay--after-open {
    border: none;
  }
`;

export const StModalWrap = styled.div`
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #ffffff;
  color: #2f2f2f;
  padding: 32px 12px;
  border-radius: 10px;
  font-size: 18px;
  line-height: 1.1;
  font-family: 'Roboto';
  font-weight: 500;
  box-sizing: border-box;

  @media (min-width: 1440px) {
    width: 1008px;
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

export const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 26px;
  font-weight: 500;
  line-height: 1.25;
  margin-bottom: 24px;
`;

export const BtnSvg = styled.button`
  width: 24px;
  height: 24px;

  @media (min-width: 768px) and (max-width: 1439px) {
    top: 32px;
    right: 24px;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ecf2ff;
  object-fit: cover;
`;

export const AvatarWrap = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 8px;
`;

export const WrapInfo = styled.div`
  margin-top: 24px;
  @media (min-width: 1440px) {
    display: flex;
    gap: 24px;
  }
`;

export const UploadLabel = styled.label`
  display: flex;
  position: relative;
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #407bff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 1.3;
`;

export const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: 24px;
  @media (min-width: 1440px) {
    margin-bottom: 52px;
  }
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
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 1.25;
`;

export const Button = styled.button`
  margin-top: 24px;
  background-color: #407bff;
  border: none;
  width: 100%;
  height: 36px;
  color: #ffffff;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 500;
  line-height: 1.3;
  border-radius: 10px;
  box-shadow: 0px 4px 8px 0px rgba(64, 123, 255, 0.34);

  @media (min-width: 768px) {
    display: block;
    font-size: 18px;
    width: 160px;
    height: 44px;
    margin-left: auto;
  }

  &:hover {
    box-shadow: 0px 4px 14px 0px rgba(64, 123, 255, 0.54);
  }

  &:focus {
    box-shadow: none;
  }
`;

export const Input = styled.input`
  margin-top: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ecf2ff;
  border-radius: 8px;
  padding: 12px 10px;
  outline: none;
  color: #407bff;
  font-size: 16px;
  &::placeholder {
    color: #9ebbff;
  }

  @media (min-width: 768px) {
    width: 392px;
  }

  &:focus {
    outline: none;
  }

  ${({ $hasError }) =>
    $hasError &&
    `
      border-color: #ef5050 !important;
      color: #ef5050;
    `}
`;

export const EmailText = styled.p`
  margin-top: 24px;
`;

export const PasswordTitle = styled.p`
  margin-top: 24px;
  @media (min-width: 1440px) {
    margin-top: 0;
  }
`;

export const PasswordText = styled.p`
  margin-top: 12px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
`;

export const InputPassword = styled.input`
  position: relative;
  margin-top: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ecf2ff;
  border-radius: 8px;
  padding: 12px 10px;
  outline: none;
  color: #407bff;
  font-size: 16px;
  &::placeholder {
    color: #9ebbff;
  }

  @media (min-width: 768px) {
    width: 392px;
  }

  &:focus {
    outline: none;
  }

  ${({ $hasError }) =>
    $hasError &&
    `
      border-color: #ef5050 !important;
      color: #ef5050;
    `}
`;

export const InputPasswordWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  @media (min-width: 768px) {
    width: 392px;
  }
`;

export const ButtonEye = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: none;
  top: 0;
  top: 50%;
  right: 10px;
  transform: translateY(-20%);
`;

export const MessageError = styled.div`
  color: #ef5050;
  font-family: 'Roboto';
  font-weight: 400;
  margin-top: 4px;
  font-size: 14px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
`;
