import Image from 'next/image'
import React, {ReactNode} from 'react'

import {Lang} from '~/i18n/config'

import LangSwitch from './LangSwitch'
import {NavList} from './NavList'
import ThemeSwitch from './ThemeSwitch'

export interface NavBarProps {
  children?: ReactNode
  lang: Lang
}

const NavBar: React.FC<NavBarProps> = async ({children, lang}) => {
  console.log('lang2', lang)
  return (
    <div className='relative z-[999] h-[64px] w-full'>
      <div className='container mx-auto h-full'>
        <div className='flex h-full items-center justify-between'>
          <div className='h-12 cursor-pointer'>
            <Image
              src='/images/logo.svg'
              height={0}
              width={0}
              sizes='100vw'
              className='h-12 w-auto'
              alt='logo'
            />
          </div>
          <nav className='text-neutral-white flex h-full flex-1 items-center justify-center'>
            <div className='mx-[60px] flex h-full'>
              <NavList lang={lang} />
            </div>
          </nav>
          <div className='ml-auto flex w-8 items-center justify-center'>
            <ThemeSwitch />
          </div>
          <div className='w-8 flex items-center justify-center'>
            <LangSwitch lang={lang} />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
export default NavBar
