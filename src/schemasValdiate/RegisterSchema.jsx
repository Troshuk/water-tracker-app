import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const RegisterForm = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(passwordRules, { message: 'Please create a stronger password' }),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});
