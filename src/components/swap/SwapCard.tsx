'use client'

import {useNumberInput} from '@/hooks/utils/useNumberInput'
import { ToUsdcPrice } from './TokenToUsdc'
import TokenListDialog from "@/components/swap/TokenListDialog";
import { useEffect, useState } from 'react';

export type SwapAsset = {
  name: string
  symbol: string
  logoURI: string
  value: number
  address: string
  decimals: number
  extensions:{coingeckoId:string}
}

export type SwapCardProps = {
  type: 'send' | 'receive'
  asset: SwapAsset
  setAsset: (value: SwapAsset) => void
  height: number,
  tokens: SwapAsset[]
}

export const SwapCard = ({type, asset, setAsset, height, tokens}: SwapCardProps) => {
  const cardHeight = height
  const [value, setValue] = useState(asset.value || 0)
  const handleChange = useNumberInput((value) => {
    setValue(value)
    setAsset({...asset, value})
  })

  useEffect(() => {
    console.log('effect swap card', asset);
    
    setValue(asset.value)
  }, [asset.value])

  return (
    <div
      className='swap-card flex flex-col justify-between rounded-lg bg-neutral-200 px-4 py-2 shadow-md dark:bg-[#262626]'
      style={{
        maskImage:
          type === 'send'
            ? `radial-gradient(36px at 50% ${cardHeight + 6}px, transparent 36px, black 36px)`
            : '',
        height: cardHeight + 'px'
      }}
    >
      <div className='flex flex-nowrap overflow-hidden'>
        {/* 代币信息 */}
        <div className='flex flex-1 items-center'>
          <TokenListDialog tokenList={tokens} token={asset} onChange={setAsset} />
          <div className='ml-2 flex flex-col justify-between overflow-hidden py-1'>
            <span className='ellipsis font-bold'>{asset.symbol}</span>
            <span className='ellipsis'>{asset.name}</span>
          </div>
        </div>
      </div>
      {/* swap数量 */}
      <div className='relative'>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-lg font-bold'>
            {type === 'send' ? 'Send' : 'Receive'}
          </span>
          <div className='ml-4 flex-1'>
            <input
              type='text'
              className='transition ease-in-out mb-1 h-12 w-full border-primary px-4 text-right text-xl font-bold outline-none rounded-lg
              bg-transparent bg-gradient-to-l from-[#00000010] to-transparent hover:from-[#00000020] duration-800'
              onChange={handleChange}
              value={value}
            />
          </div>
          <div className='absolute right-0 pr-4 -bottom-1 h-5 text-neutral-60 animate-in slide-in-from-bottom'>
            {asset.address ? (
              <ToUsdcPrice ids={asset.address} amount={Number(value)} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
