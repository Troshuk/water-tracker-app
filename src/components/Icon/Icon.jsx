import icons from 'images/icons.svg';
import css from './Icon.module.css';

export const Icon = ({ id, ...props }) => (
  <svg className={css.icon} {...props}>
    <use href={`${icons}#${id}`}></use>
  </svg>
);
