import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';

import {
  AboutFormula,
  AboutFormulaColor,
  AmountNumberInfo,
  AmountText,
  AmountTextInfo,
  BtnCloseModal,
  Button,
  CircleColor,
  FormulaText,
  Input,
  MessageError,
  StyledRadioCircle,
  StyledRadioGroup,
  StyledRadioInput,
  StyledRadioLabel,
  StyledRadioText,
  StyledReactModal,
  Text,
  TextInfo,
  TitleText,
  ValueDiv,
  ValueSpan,
  WrapFormula,
  WrapFormulaText,
  WrapHeader,
} from './DailyNormaModal.styled';
import { Icon } from 'components';
import { userSelector, viewingDateSelector } from 'store/selectors';
import { DailyNormaModalSchema } from 'schemasValdiate/dailyNormaModallSchema';
import { updateWaterGoal } from 'store/operations';
import { notify } from 'notify';
import { notifyApi } from 'notify';

export const DailyNormaModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();
  const { gender } = useSelector(userSelector);
  const [amount, setAmount] = useState(0);
  const viewingDate = useSelector(viewingDateSelector);

  const formik = useFormik({
    initialValues: {
      gender,
      weight: 0,
      time: 0,
    },
    validationSchema: DailyNormaModalSchema,
    onSubmit: async () => {
      let waterNorma = amount * 1000;

      if (waterNorma < 1000) {
        return notify('Even the cat drinks more (min 1 L)', 'error');
      }

      if (waterNorma > 15000 && waterNorma <= 25000) {
        return notify(
          'This is amount of water that horse usually drinks. Please pick another amount (max rate 15 L)',
          'error'
        );
      }

      if (waterNorma > 25000) {
        return notify(
          'This is amount of water that elephant usually drinks. Please pick another amount (max rate 15 L)',
          'error'
        );
      }

      const data = { dailyWaterGoal: waterNorma };

      if (viewingDate) {
        data.viewingDate = viewingDate;
      }
      notifyApi(
        dispatch(updateWaterGoal(data)).unwrap().then(handleCloseModal),
        `Updating your daily norma`,
        true
      );
    },
  });

  useEffect(() => {
    const weightNumber = Math.floor(formik.values.weight);
    let timeNumber = Math.floor(formik.values.time);

    if (
      formik.values.gender === '' ||
      isNaN(weightNumber) ||
      weightNumber < 0 ||
      timeNumber < 0
    ) {
      return;
    }
    if (isNaN(timeNumber)) {
      timeNumber = 0;
    }

    let result;

    switch (formik.values.gender) {
      case 'woman':
        result = (weightNumber * 0.03 + timeNumber * 0.4).toFixed(1);
        break;
      case 'man':
        result = (weightNumber * 0.04 + timeNumber * 0.6).toFixed(1);
        break;
      default:
        return;
    }

    setAmount(result);
  }, [formik.values]);

  const manFromula = 'V=(M*0,04) + (T*0,6)';
  const womanFormula = 'V=(M*0,03) + (T*0,4)';

  const handleCloseModal = () => {
    closeModal();
    formik.resetForm();
    setAmount(0);
  };

  const handleGenderChange = e => {
    formik.setFieldValue('gender', e.target.value);
  };

  const handleInputChange = e => {
    formik.handleChange(e);
  };

  return (
    <StyledReactModal
      contentLabel="Modal"
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      closeTimeoutMS={300}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <WrapHeader>
        <TitleText>
          My daily norma{' '}
          {viewingDate && ` for: ${moment(viewingDate).format('LL')}`}
        </TitleText>
        <BtnCloseModal type="button" onClick={handleCloseModal}>
          <Icon
            id="icon-close-x"
            width="14"
            height="14"
            style={{ stroke: '#407bff' }}
          />
        </BtnCloseModal>
      </WrapHeader>
      <form onSubmit={formik.handleSubmit}>
        <WrapFormulaText>
          <p>
            For woman: <FormulaText>{womanFormula}</FormulaText>
          </p>
          <p>
            For man: <FormulaText>{manFromula}</FormulaText>
          </p>
        </WrapFormulaText>
        <WrapFormula>
          <FormulaText>
            <AboutFormula>
              <AboutFormulaColor>* </AboutFormulaColor>V is the volume of the
              water norm in liters per day, M is your body weight, T is the time
              of active sports, or another type of activity commensurate in
              terms of loads (in the absence of these, you must set 0)
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
              onChange={handleGenderChange}
              $hasError={formik.touched.name && formik.errors.name}
            />
            <StyledRadioCircle>
              <CircleColor
                checked={formik.values.gender === 'woman'}
              ></CircleColor>
            </StyledRadioCircle>
            <StyledRadioText>For woman</StyledRadioText>
          </StyledRadioLabel>
          <StyledRadioLabel>
            <StyledRadioInput
              type="radio"
              name="gender"
              value="man"
              onChange={handleGenderChange}
              $hasError={formik.touched.name && formik.errors.name}
            />
            <StyledRadioCircle>
              <CircleColor
                checked={formik.values.gender === 'man'}
              ></CircleColor>
            </StyledRadioCircle>
            <StyledRadioText>For man</StyledRadioText>
          </StyledRadioLabel>
        </StyledRadioGroup>
        {formik.touched.gender && formik.errors.gender ? (
          <MessageError>{formik.errors.gender}</MessageError>
        ) : null}
        <label>
          <TextInfo>Your weight in kilograms:</TextInfo>
          <ValueDiv>
            <Input
              name="weight"
              type="text"
              value={formik.values.weight}
              onChange={handleInputChange}
              $hasError={formik.touched.weight && formik.errors.weight}
            />
            <ValueSpan>kg</ValueSpan>
          </ValueDiv>
          {formik.touched.weight && formik.errors.weight ? (
            <MessageError>{formik.errors.weight}</MessageError>
          ) : null}
        </label>
        <label>
          <TextInfo>
            The time of active participation in sports or other activities with
            a high physical load in hours:
          </TextInfo>
          <ValueDiv>
            <Input
              name="time"
              type="text"
              value={formik.values.time}
              onChange={handleInputChange}
              $hasError={formik.touched.time && formik.errors.time}
            />
            <ValueSpan>hours</ValueSpan>
          </ValueDiv>
          {formik.touched.time && formik.errors.time ? (
            <MessageError>{formik.errors.time}</MessageError>
          ) : null}
        </label>
        <AmountText>
          <AmountTextInfo>
            The required amount of water in liters per day:
          </AmountTextInfo>
          <AmountNumberInfo>{amount} L</AmountNumberInfo>
        </AmountText>
        <Text>Write down how much water you will drink:</Text>
        <ValueDiv>
          <Input
            name="consumedWater"
            type="text"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            $hasError={
              formik.touched.consumedWater && formik.errors.consumedWater
            }
          />
          <ValueSpan>L</ValueSpan>
        </ValueDiv>
        {formik.touched.consumedWater && formik.errors.consumedWater ? (
          <MessageError>{formik.errors.consumedWater}</MessageError>
        ) : null}
        <Button type="submit">Save</Button>
      </form>
    </StyledReactModal>
  );
};
