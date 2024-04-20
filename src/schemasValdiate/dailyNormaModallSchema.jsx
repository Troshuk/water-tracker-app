import * as Yup from 'yup';

export const DailyNormaModalSchema = Yup.object().shape({
    gender: Yup.string().required('Gender is required'),
    weight: Yup.number('Must be number').positive('Number must be positive').min(1)
        .required('Weight is required'),
    time: Yup.number().typeError('Must be a number').max(24, 'Time must not be greater than 24')
        .min(0).nullable(),
    dailyWaterGoal: Yup.number().typeError('Must be a number'),
})