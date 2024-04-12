import { Container, Section } from 'components';
import css from './Welcome.module.css';
import { Icon } from 'components';

export const Welcome = () => {
  return (
    <Section className={css.section} >
      <Container className={css.homeContainer}>
        <div className={css.welcomeContainer}>
        <div className={css.titleContainer}>
          <h1 className={css.title}>Water consumption
          tracker</h1>
        <p className={css.secondTitle}>Record daily water
intake and track</p>
        </div>
        <div className={css.trackerBenefits}>
          <h2 className={css.benefits}>Tracker Benefits</h2>
          <ul className={css.benefitsList}>
            <li className={css.benefitsItem}>
              <Icon className={css.benefitsItemIcon} id="icon-calendar-days" width="32" height="32" />
              Habit drive</li>
            <li className={css.benefitsItem}>
              <Icon className={css.benefitsItemIcon} id="icon-presentation-chart-bar" width="32" height="32" />
              View statistics</li>
            <li className={css.benefitsItem}>
              <Icon className={css.benefitsItemIcon} id="icon-wrench-screwdriver" width="32" height="32" />
              Personal rate setting</li>
          </ul>
        </div>

        <button className={css.benefitsBtn} type="button" >Try tracker</button>
        </div>

        <div className={css.whyDrinkContainer}>
          <h2 className={css.benefits}>Why drink water</h2>
          <ul className={css.whyDrinkList}>
            
<li className={css.whyDrinkItem}>
              <Icon className={css.whyDrinkItemIcon} id="icon-plus-circle" width="8" height="8" />
<p>Supply of nutrients to all organs</p>
            </li>
           
            
                <li className={css.whyDrinkItem}>
              <Icon className={css.whyDrinkItemIcon} id="icon-plus-circle" width="8" height="8" />
Providing oxygen to the lungs
            </li>
                <li className={css.whyDrinkItem}>
              <Icon className={css.whyDrinkItemIcon} id="icon-plus-circle" width="8" height="8" />
Maintaining the work of the heart
            </li>
                <li className={css.whyDrinkItem}>
              <Icon className={css.whyDrinkItemIcon} id="icon-plus-circle" width="8" height="8" />
Release of processed substances
            </li>
                <li className={css.whyDrinkItem}>
              <Icon className={css.whyDrinkItemIcon} id="icon-plus-circle" width="8" height="8" />
Ensuring the stability of the internal environment
            </li>
                <li className={css.whyDrinkItem}>
              <Icon className={css.whyDrinkItemIcon} id="icon-plus-circle" width="8" height="8" />
Maintaining within the normal temperature
            </li>
                <li className={css.whyDrinkItem}>
              <Icon className={css.whyDrinkItemIcon} id="icon-plus-circle" width="8" height="8" />
Maintaining an immune system capable of resisting disease
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
};
