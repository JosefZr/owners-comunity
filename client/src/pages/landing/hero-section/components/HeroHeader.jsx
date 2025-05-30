import { size } from '@/lib/mediaQuerys';
import styled from 'styled-components';
const SubParagraph = styled.h2`
  color: var(--whiteGray);
  text-align: center;
  text-transform: none;
  /* font-family: Inter Variablefont Slnt Wght, sans-serif; */
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;

  @media screen and (max-width: ${size.laptopL}) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: ${size.laptop}) {
    font-size: 1.2rem;
  }
`;
const HeroHeading = styled.h1`
  background-color: white;
  text-transform: uppercase;
  background-position: 50%;
  background-repeat: repeat;
  background-size: cover;
  text-align: center;
  -webkit-text-fill-color: transparent;
  /* background-image: url("/backs/heading-texture_1heading-texture.webp"); */
  background-clip: text;
  font-size: 3.88rem;
  font-weight: 600;
  line-height: 1;

  @media screen and (max-width: 991px) {
    font-size: 2.8rem;
    margin-top: 1rem;
  }
  @media screen and (max-width: 591px) {
    font-size: 1.8rem;
    margin-top: 1rem;
  }
`;

export default function HeroHeader() {
  return (
    <div className="flex flex-col gap-3 items-center mx-auto" style={{
      maxWidth: "90%",
      fontFamily: "'Funnel Display', sans-serif"
    }}>
      {/* <Logo /> */}
      {/* <HeroHeading>
        <div >
          <h1>
            You&apos;re running a business.
            <br />
            You don’t need more tasks.
          </h1>
        </div>
      </HeroHeading> */}
      <SubParagraph>
        <div className='text-my-from'>
          You&apos;re running a business.
          <br />
          You don’t need more tasks.
          <br />
          You need <span className="font-bold text-my-white">systems that make money. Fast.</span>
        </div>
      </SubParagraph>
    </div>
  )
}
