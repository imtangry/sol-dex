import { NextPage } from 'next/types';
import { Lang } from '~/i18n/config';


interface LandingProps {
  params: {
    lang: Lang;
  };
}

const Landing: NextPage<LandingProps> = ({ params: { lang } }) => {
  console.log('lang4', lang);
  
  return (
    <>
      <div className="flex flex-col justify-center items-center container mx-auto">
        landing
      </div>
    </>
  );
};

export default Landing;
