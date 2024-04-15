import styled from 'styled-components';
// import bottleMobile from 'images/bottle-home-screen-phone.png';
import bottleMobileX2 from 'images/bottle-home-screen-phone-2x.png';
// import bottleTablet from 'images/botle-home-screen-tablet.png';
import bottleTabletX2 from 'images/botle-home-screen-tablet-2x.png';
// import bottleDesktop from 'images/bottle-home-screen-desktop.png';
import bottleDesktopX2 from 'images/bottle-home-screen-desktop-2x.png';

export const ImageOfBottle = () => {
  return (
    <ImgTumb>
      <img
        src={bottleMobileX2}
        srcSet={`

          ${bottleMobileX2} 320w,

          ${bottleTabletX2} 768w,

          ${bottleDesktopX2} 1400w,
        `.trim()}
        sizes="(min-width: 1441px) 1440px,
              (min-width: 769px) 768px,
              (max-width: 320px) 100vw
"
        alt="bottle"
      />
    </ImgTumb>
  );
};

const ImgTumb = styled.div`
  margin-bottom: 16px;
  width: 100%;

  margin-left: auto;
  margin-right: auto;
  z-index: -1;
  position: relative;

  img {
    width: 100%;
    height: auto;
  }

  @media (min-width: 320px) {
    width: 280px;
    height: 208px;

    // position: relative;
  }
  @media (min-width: 768px) {
    width: 518px;
    height: 386px;
    // position: relative;
  }

  @media (min-width: 1440px) {
    width: 738px;
    height: 548px;
    margin-bottom: 24px;
    img {
      position: relative;
      left: -50px;
    }
  }
`;
