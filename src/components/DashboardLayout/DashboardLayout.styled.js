import styled from 'styled-components';

import { Container, Section } from 'components';

import backgroundImgMob from 'images/background-home-screen-phone-2x.png';
import backgroundImgTab from 'images/background-home-screen-tablet-2x.png';
import backgroundImgDesc from 'images/background-element-main-page-desktop-2x.png';

export const StyledSection = styled(Section)`
  background-image: url(${backgroundImgMob});
  background-size: cover;
  position: relative;
  background-position: 0% -5%;
  background-repeat: no-repeat;
  height: 100%;
  z-index: 0;

  @media screen and (min-width: 768px) {
    background-image: url(${backgroundImgTab});
    background-size: cover;
    background-position: 0% 0%;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 1440px) {
    background-image: url(${backgroundImgDesc});
    background-size: contain;
    background-position: 52% center;
    background-position-y: 30px, center;
    background-repeat: no-repeat;
  }
`;

export const StyledContainer = styled(Container)`
  @media (min-width: 1440px) {
    display: flex;
    gap: 32px;
    margin-top: 22px;
  }

  @media only screen and (max-width: 1439px) {
    padding-bottom: 40px;
    margin-top: 24px;
  }
`;

export const LeftSideDiv = styled.div`
  @media (min-width: 1440px) {
    padding-top: 30px;
    /* padding-bottom: 76px; */
    width: 592px;
  }

  @media screen and (min-width: 768px) {
    padding-top: 16px;
  }
`;
