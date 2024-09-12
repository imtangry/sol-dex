'use client'

import {BaseWalletMultiButton} from '@solana/wallet-adapter-react-ui'
import React, {useEffect, useState} from 'react'
import { useTranslation } from '~/i18n/client'

import {Lang} from '~/i18n/config'

// const LABELS =  as const

export default function ConnectWallet({lang, className}: {lang: Lang, className?: string}) {
  console.log('ConnectWallet lang', lang)
  const {t} = useTranslation(lang)
  const [label, setLabel] = useState({ 'change-wallet': t('changeWallet'),
    connecting: t('connecting'),
    'copy-address': t('copyAddress'),
    copied: t('copied'),
    disconnect: t('disconnect'),
    'has-wallet': t('hasWallet'),
    'no-wallet': t('noWallet'),})

  useEffect(() => {
    setLabel({
      'change-wallet': t('changeWallet'),
      connecting: t('connecting'),
      'copy-address': t('copyAddress'),
      copied: t('copied'),
      disconnect: t('disconnect'),
      'has-wallet': t('hasWallet'),
      'no-wallet': t('noWallet'),
    })
  }, [t])
  return <BaseWalletMultiButton labels={label} className={className} />
}
