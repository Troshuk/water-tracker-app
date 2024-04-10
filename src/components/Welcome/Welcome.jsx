import css from './Welcome.module.css';

export const Welcome = () => {
  return (
    <div className={css.homeContainer}>
      <h1 className={css.title}>Welcome to the App</h1>
    </div>
  );
};
