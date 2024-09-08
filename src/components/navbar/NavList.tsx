'use client'

import {useCustomPathname} from '@/hooks/route/useCustomPathname'
import {useRedirect} from '@/hooks/route/useRedirect'
import {cn} from '@/lib/utils'

import {useTranslation} from '~/i18n/client'
import {Lang} from '~/i18n/config'

import {MenuLink, NavbarItem} from './type'

const navList: NavbarItem[] = [
  {
    label: 'swap',
    path: '/swap' as MenuLink
  },
  {
    label: 'staking',
    path: '/staking' as MenuLink
  }
]

export const NavList = ({lang}: {lang: Lang}) => {
  console.log('lang3', lang)
  const pathname = useCustomPathname()
  const {redirectToUrl} = useRedirect()
  const {t} = useTranslation(lang)

  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nav: NavbarItem
  ) => {
    const path = nav.path as MenuLink
    if (path === pathname) return
    redirectToUrl(path)
  }

  return (
    <>
      {navList.map((nav) => (
        <div
          key={nav.label}
          onClick={(e) => handleClickNav(e, nav)}
          className={cn(
            ' cursor-pointer hover-underline group relative flex h-full items-center hover:bg-neutral-200 dark:hover:bg-neutral-800',
            {
              'active font-bold bg-neutral-200 dark:bg-neutral-800': pathname === nav.path
            }
          )}
        >
          <div className='flex items-center gap-1 px-8 py-1'>
            <div className='capitalize'>
              <span>{t(nav.label)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
