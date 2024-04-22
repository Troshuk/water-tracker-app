import * as Yup from 'yup';

export const DailyNormaModalSchema = Yup.object().shape({
  gender: Yup.string().required('Gender is required'),
  weight: Yup.number()
    .typeError('For calculation, you need to enter a number here.')
    .positive('Number must be positive')
    .min(1)
    .required('Weight is required'),
  time: Yup.number()
    .typeError('For calculation, you need to enter a number here.')
    .max(24, 'The time should not exceed 24 hours.')
    .min(0)
    .nullable(),
  consumedWater: Yup.number().typeError(
    'For change the calculated amount of water, you need to enter a number here.'
  ),
});
