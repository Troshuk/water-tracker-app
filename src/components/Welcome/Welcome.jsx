import { Container, Section } from 'components';
import css from './Welcome.module.css';
import { Icon } from 'components';

import { Link } from 'react-router-dom';
import React from 'react';
import { SIGN_UP_ROUTE } from 'routes/routes.js';

const whys = [
  'Supply of nutrients to all organs',
  'Providing oxygen to the lungs',
  'Maintaining the work of the heart',
  'Release of processed substances',
  'Ensuring the stability of the internal environment',
  'Maintaining within the normal temperature',
  'Maintaining an immune system capable of resisting disease',
];

const benefits = [
  { icon: 'icon-calendar-days', text: 'Habit drive' },
  { icon: 'icon-presentation-chart-bar', text: 'View statistics' },
  { icon: 'icon-wrench-screwdriver', text: 'Personal rate setting' },
];

export const Welcome = () => {
  return (
    <Section className={css.section}>
      <Container className={css.homeContainer}>
        <div className={css.welcomeContainer}>
          <div className={css.titleContainer}>
            <h1 className={css.title}>Water consumption tracker</h1>

            <p className={css.secondTitle}>
              Record daily water intake and track
            </p>
          </div>

          <div className={css.trackerBenefits}>
            <h2 className={css.benefits}>Tracker Benefits</h2>

            <ul className={css.benefitsList}>
              {benefits.map(benefit => (
                <li className={css.benefitsItem}>
                  <Icon
                    className={css.benefitsItemIcon}
                    id={benefit.icon}
                    width="32"
                    height="32"
                  />
                  {benefit.text}
                </li>
              ))}
            </ul>
          </div>

          <Link to={SIGN_UP_ROUTE}>
            <button className={css.benefitsBtn} type="button">
              Try tracker
            </button>
          </Link>
        </div>

        <div className={css.whyDrinkContainer}>
          <h2 className={css.benefits}>Why drink water</h2>

          <ul className={css.whyDrinkList}>
            {whys.map(why => (
              <li className={css.whyDrinkItem}>
                <span>
                  <Icon
                    className={css.whyDrinkItemIcon}
                    id="icon-plus-circle"
                    width="8"
                    height="8"
                  />
                </span>
                <p>{why}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
};
