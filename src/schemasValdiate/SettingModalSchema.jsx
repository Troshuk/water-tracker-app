import * as Yup from 'yup';

export const SettingModalSchema = Yup.object().shape({
  name: Yup.string().nullable().max(32, 'Name is too long'),
  email: Yup.string()
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email address'
    )
    .required('Email is required'),
  newPassword: Yup.string()
    .min(8, 'Password is too short')
    .max(64, 'Password is too long')
    .nullable(),
  confirmPassword: Yup.string()
    .min(8, 'Password is too short')
    .max(64, 'Password is too long')
    .when('newPassword', ([newPassword], schema) => {
      if (!newPassword) {
        return schema.nullable();
      } else {
        return schema
          .required('New password repeat is required')
          .oneOf([Yup.ref('newPassword')], 'Passwords must match');
      }
    }),
  oldPassword: Yup.string()
    .min(8, 'Password is too short')
    .max(64, 'Password is too long')
    .when('newPassword', ([newPassword], schema) => {
      if (!newPassword) {
        return schema.nullable();
      } else {
        return schema.required('Password is required');
      }
    }),
});
