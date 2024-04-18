import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password repeat is required'),
});
