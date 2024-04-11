import { NavLink } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { ContentLoader } from 'components';

import { SIGN_UP_ROUTE } from 'routes/routes';
import { logInSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logIn } from 'store/operations';

import css from './LoginFrom.module.css';

export const LoginFrom = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(logInSelector);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    notifyApi(
      dispatch(logIn(data))
        .unwrap()
        .then(() => e.target.reset()),
      `Attempt to login as: ${data.email}`,
      true
    );
  };

  return (
    <div className={css.loginContainer}>
      <h1 className={css.title}>Log In</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <span>Email:</span>
          <input type="email" name="email" required />
        </label>
        <label className={css.label}>
          <span>Password:</span>
          <input type="password" name="password" required />
        </label>
        <button type="submit" className={css.button} disabled={isLoading}>
          Log In &nbsp; {isLoading ? <ContentLoader /> : <FaSignInAlt />}
        </button>
      </form>
      <div className={css.redirectLink}>
        <p>Don't have an account yet?</p>
        <NavLink to={SIGN_UP_ROUTE} className={css.link}>
          Register Now
        </NavLink>
      </div>
    </div>
  );
};
