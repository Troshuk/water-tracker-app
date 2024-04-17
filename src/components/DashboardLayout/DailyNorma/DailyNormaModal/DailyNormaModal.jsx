import {
  AboutFormula,
  AboutFormulaColor,
  AmountNumberInfo,
  AmountText,
  AmountTextInfo,
  BtnCloseModal,
  Button,
  CircleColor1,
  CircleColor2,
  FormulaText,
  Input,
  StyledRadioCircle,
  StyledRadioGroup,
  StyledRadioInput,
  StyledRadioLabel,
  StyledRadioText,
  StyledReactModal,
  Text,
  TextInfo,
  TitleText,
  WrapFormula,
  WrapFormulaText,
  WrapHeader,
} from './DailyNormaModal.styled';
import { Icon } from 'components';

export const DailyNormaModal = ({ modalIsOpen, closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <StyledReactModal
      contentLabel="Modal"
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <WrapHeader>
        <TitleText>My daily norma</TitleText>
        <BtnCloseModal type="button" onClick={handleCloseModal}>
          <Icon id="icon-plus-small" width="36" height="36" style={{stroke: '#407bff'}} />
        </BtnCloseModal>
      </WrapHeader>
      <form>
        <WrapFormulaText>
          <p>
            For girl: <FormulaText>V=(M*0,03) + (T*0,4)</FormulaText>
          </p>
          <p>
            For man: <FormulaText>V=(M*0,04) + (T*0,6)</FormulaText>
          </p>
        </WrapFormulaText>
        <WrapFormula>
          <FormulaText>
              <AboutFormula>
                <AboutFormulaColor>* </AboutFormulaColor>V is the volume of the
                water norm in liters per day, M is your body weight, T is the
                time of active sports, or another type of activity commensurate
                in terms of loads (in the absence of these, you must set 0)
              </AboutFormula>
          </FormulaText>
        </WrapFormula>
        <Text>Calculate your rate:</Text>
        <StyledRadioGroup role="group" aria-labelledby="my-radio-group">
          <StyledRadioLabel>
            <StyledRadioInput
              type="radio"
              name="gender"
              value="woman"
            />
            <StyledRadioCircle>
              <CircleColor2 />
            </StyledRadioCircle>
            <StyledRadioText>For woman</StyledRadioText>
          </StyledRadioLabel>
          <StyledRadioLabel>
            <StyledRadioInput
              type="radio"
              name="gender"
              value="man"
            />
            <StyledRadioCircle>
              <CircleColor1 />
            </StyledRadioCircle>
            <StyledRadioText>For man</StyledRadioText>
          </StyledRadioLabel>
        </StyledRadioGroup>
        <label>
          <TextInfo>Your weight in kilograms:</TextInfo>
          <Input
            name="weight"
            type="text"
            placeholder="0"
          />
        </label>
        <label>
          <TextInfo>
            The time of active participation in sports or other activities with
            a high physical. load in hours:
          </TextInfo>
          <Input
            name="time"
            type="text"
            placeholder="0"
          />
        </label>
        <AmountText>
          <AmountTextInfo>
            The required amount of water in liters per day:
          </AmountTextInfo>
          <AmountNumberInfo>1.8 L</AmountNumberInfo>
        </AmountText>
        <Text>Write down how much water you will drink:</Text>
        <Input
          name="dailyNorma"
          type="text"
          placeholder="0"
        />
        <Button type="submit">
          Save
        </Button>
      </form>
    </StyledReactModal>
  );
};
