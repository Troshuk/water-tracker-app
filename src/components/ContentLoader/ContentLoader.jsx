import { FaSpinner } from 'react-icons/fa';

import css from './ContentLoader.module.css';

export const ContentLoader = ({ text = null }) => {
  return (
    <>
      {text}
      <FaSpinner className={css.loadingIcon} />
    </>
  );
};
