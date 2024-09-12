import {Swap} from '@/components/swap'
import {NextPage} from 'next/types'

import {Lang} from '~/i18n/config'

interface LandingProps {
  params: {
    lang: Lang
  }
}

const Landing: NextPage<LandingProps> = ({params: {lang}}) => {
  console.log('lang4', lang)

  return (
    <div className='container mx-auto flex flex-col justify-center items-center p-8'>
      <div className='w-[480px] bg-neutral-100 dark:bg-neutral-600 rounded-xl p-3'>
        <Swap lang={lang} />
      </div>
    </div>
  )
}

export default Landing
