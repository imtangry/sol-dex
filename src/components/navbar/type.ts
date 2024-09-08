import {ReactNode} from 'react'

export enum MenuLink {
  SWAP = '/swap',
  STAKING = '/staking'
}

export interface NavbarItem {
  label: string
  path?: MenuLink
  id?: string
  link?: string
  description?: string
  needLogin?: boolean
  menu?: NavbarItem[]
  icon?: ReactNode
}
