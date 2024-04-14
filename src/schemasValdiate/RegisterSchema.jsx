import * as Yup from 'yup';

export const RegisterForm = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long'),
});
