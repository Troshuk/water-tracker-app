import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

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
  WrapFormula,
  WrapFormulaText,
  WrapHeader,
} from './DailyNormaModal.styled';
import { Icon } from 'components';
import { AuthReducerSelector } from 'store/selectors';
import { DailyNormaModalSchema } from 'schemasValdiate/dailyNormaModallSchema';
import { updateWaterGoal } from 'store/operations';
import { notify } from 'notify';

export const DailyNormaModal = ({ modalIsOpen, closeModal }) => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector(AuthReducerSelector);

  const formik = useFormik({
    initialValues: {
      gender: user.gender,
      weight: 0,
      time: 0,
      dailyWaterGoal: 0,
    },
    validationSchema: DailyNormaModalSchema,
    onSubmit: async values => {
      let waterNorma = amount * 1000;
      if (values.dailyWaterGoal > 0) {
        waterNorma = values.dailyWaterGoal * 1000;
      }

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

      dispatch(
        updateWaterGoal({
          dailyWaterGoal: waterNorma,
        })
      )
        .unwrap()
        .then(handleCloseModal);
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

    formik.values.dailyNorma = result;
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
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <WrapHeader>
        <TitleText>My daily norma</TitleText>
        <BtnCloseModal type="button" onClick={handleCloseModal}>
          <Icon
            id="icon-plus-small"
            width="36"
            height="36"
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
          <Input
            name="weight"
            type="text"
            value={formik.values.weight}
            onChange={handleInputChange}
            $hasError={formik.touched.weight && formik.errors.weight}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <MessageError>{formik.errors.weight}</MessageError>
          ) : null}
        </label>
        <label>
          <TextInfo>
            The time of active participation in sports or other activities with
            a high physical. load in hours:
          </TextInfo>
          <Input
            name="time"
            type="text"
            value={formik.values.time}
            onChange={handleInputChange}
            $hasError={formik.touched.time && formik.errors.time}
          />
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
        <Input
          name="dailyNorma"
          type="text"
          value={formik.values.dailyNorma}
          onChange={handleInputChange}
          $hasError={formik.touched.dailyNorma && formik.errors.dailyNorma}
        />
        {formik.touched.dailyNorma && formik.errors.dailyNorma ? (
          <MessageError>{formik.errors.dailyNorma}</MessageError>
        ) : null}
        <Button type="submit">Save</Button>
      </form>
    </StyledReactModal>
  );
};
