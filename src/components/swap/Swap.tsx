'use client'

import {Button} from '@/components/ui/button'

import './swap.css'

import {Skeleton} from '@/components/ui/skeleton'
import {useWallet} from '@solana/wallet-adapter-react'
import {ArrowUpDown} from 'lucide-react'
import {useEffect, useState} from 'react'

import {Lang} from '~/i18n/config'

import ConnectWallet from '../navbar/ConnectWallet'
import {SwapAsset, SwapCard} from './SwapCard'

const cardHeight = 160
let tokens: SwapAsset[] = []
export const Swap = ({lang}: {lang: Lang}) => {
  const {publicKey} = useWallet()
  const slippageBps = 50
  const [loading, setLoading] = useState<boolean>(true)
  const [tokenList, setTokenList] = useState(tokens)

  const [send, setSend] = useState<SwapAsset>({} as SwapAsset)

  const [receive, setReceive] = useState<SwapAsset>({} as SwapAsset)

  const reverse = () => {
    const temp = {...send}
    setSend({...receive})
    setReceive({...temp})
  }

  const quoteResponse = async () => {
    const res = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${send.address}&outputMint=${receive.address}&amount=${10 ** send.decimals * Number(send.value)}&slippageBps=${slippageBps}`
    )

    const data = await res.json()
    setReceive({
      ...receive,
      value: Number(data.outAmount) / 10 ** receive.decimals
    })
  }

  useEffect(() => {
    const getTokens = async () => {
      const res = await fetch(
        'https://tokens.jup.ag/tokens/tradable?tags=verified'
      )
      const data = await res.json()
      tokens = data
      setTokenList(data)
      setSend({...data[0], value: 0})
      setReceive({...data[1], value: 0})
      setLoading(false)
    }
    if (tokens.length === 0) {
      getTokens()
    }
  }, [])

  useEffect(() => {
    if (send.value && send.value !== 0) {
      quoteResponse()
    } else {
      setReceive({...receive, value: 0})
    }
  }, [send])
  return (
    <div className='page-swap space-y-4 animate-in slide-in-from-bottom'>
      <div className='relative space-y-2'>
        {loading ? (
          <>
            <div className='space-y-2 rounded-lg bg-neutral-200 px-4 py-2 dark:bg-neutral-700'>
              <Skeleton className='h-[70px] w-full' />
              <Skeleton className='h-[70px] w-full' />
            </div>
            <div className='space-y-2 rounded-lg bg-neutral-200 px-4 py-2 dark:bg-neutral-700'>
              <Skeleton className='h-[70px] w-full' />
              <Skeleton className='h-[70px] w-full' />
            </div>
          </>
        ) : (
          <>
            <SwapCard
              type='send'
              asset={send}
              setAsset={setSend}
              height={cardHeight}
              tokens={tokenList}
            />
            <SwapCard
              type='receive'
              asset={receive}
              setAsset={setReceive}
              height={cardHeight}
              tokens={tokenList}
            />
          </>
        )}
        <Button
          size='rounded'
          className='absolute left-1/2 h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 bg-[#512da8] hover:bg-[#000]'
          style={{
            top: cardHeight - 2 + 'px'
          }}
          onClick={reverse}
        >
          <ArrowUpDown className='h-8 w-8 text-white' />
        </Button>
      </div>
      {publicKey ? (
        <Button className='mt-4 h-14 w-full bg-[#512da8] text-lg font-bold text-white hover:bg-[#000]'>
          Swap
        </Button>
      ) : (
        <ConnectWallet
          lang={lang}
          className='mt-4 w-full'
        />
      )}

      <div className='mt-4 bg-neutral-200 px-4 py-2 dark:bg-neutral-800'>
        {receive.value !== 0 ? (<div className='space-y-1'>
          <div className='flex items-center justify-between text-xs'>
            <div className='text-white-50'>Minimum Received</div>
            <div className='text-white-50'>{receive.value * (1-(slippageBps/10000))}</div>
          </div>
          <div className='flex items-center justify-between text-xs'>
            <div className='text-black-50 dark:text-white-50 flex w-[50%]'>
              Max Transaction Fee
              <div className=''>
                <span className='ml-1 cursor-pointer'>[?]</span>
              </div>
              <div className='pointer-events-none fixed left-0 top-0 z-[-1] h-full w-full opacity-0 transition-all'></div>
            </div>
            <div className='text-black-50 dark:text-white-50'>0.004005 SOL</div>
          </div>
          <div className='flex items-start justify-between text-xs'>
            <div className='text-black-50 dark:text-white-50 flex w-[50%]'>
              Deposit
              <div className=''>
                <span className='ml-1 cursor-pointer'>[?]</span>
              </div>
              <div className='pointer-events-none fixed left-0 top-0 z-[-1] h-full w-full opacity-0 transition-all'></div>
            </div>
            <div className='text-black-50 dark:text-white-50 w-[50%] text-right text-xs'>
              <p>0.00203928 SOL for 1 ATA account</p>
            </div>
          </div>
          <div className='flex items-center justify-between text-xs'>
            <div className='text-black-50 dark:text-white-50'>Price Impact</div>
            <div className='text-white-50'>&lt; 0.1%</div>
          </div>
          <div className='flex items-start justify-between text-xs'>
            <div className='text-white-50 justify-start'>Price Difference</div>
            <div className='flex flex-col text-xs'>
              <div className='flex w-full flex-row justify-end'>
                <span className='!text-jupiter-jungle-green text-end'>
                  &lt; 0.1% cheaper
                </span>
                <div className='!text-jupiter-jungle-green fill-current'></div>
              </div>
            </div>
          </div>
        </div>) : 
        (<Skeleton className='h-[96px]' />) }
        
      </div>
    </div>
  )
}
