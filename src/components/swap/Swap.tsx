'use client'

import {Button} from '@/components/ui/button'

import './swap.css'

import {useWallet} from '@solana/wallet-adapter-react'
import {ArrowUpDown} from 'lucide-react'
import {useEffect, useState} from 'react'

import ConnectWallet from '../navbar/ConnectWallet'
import {SwapAsset, SwapCard} from './SwapCard'
import {Lang} from "~/i18n/config";
import {Skeleton} from "@/components/ui/skeleton";

const cardHeight = 160
let tokens:SwapAsset[] = []
export const Swap = ({lang}:{lang:Lang}) => {
  const {publicKey} = useWallet()
  const [loading, setLoading] = useState<boolean>(true)
  const [tokenList, setTokenList] = useState(tokens)

  const [send, setSend] = useState<SwapAsset>({} as SwapAsset)

  const [receive, setReceive] = useState<SwapAsset>({} as SwapAsset)

  const reverse = () => {
    const temp = {...send}
    setSend({...receive})
    setReceive({...temp})
  }

  useEffect(() => {
    const getTokens = async ()=>{
      const res = await fetch("https://tokens.jup.ag/tokens/tradable?tags=verified")
      const data = await res.json()
      tokens = data
      setTokenList(data)
      setSend({...data[0],value:0})
      setReceive({...data[1],value:0})
      setLoading(false)
    }
    if(tokens.length=== 0){
      getTokens()
    }
  }, []);
  return (
    <div className='page-swap animate-in slide-in-from-bottom space-y-4'>
      <div className='relative space-y-2'>
        {loading? <>
          <div className='space-y-2 rounded-lg bg-neutral-200 px-4 py-2'>
            <Skeleton className="h-[70px] w-full" />
            <Skeleton className="h-[70px] w-full" />
          </div>
          <div className='space-y-2 rounded-lg bg-neutral-200 px-4 py-2'>
            <Skeleton className="h-[70px] w-full" />
            <Skeleton className="h-[70px] w-full" />
          </div>
        </> : <><SwapCard
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
          /></>}
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
        <Button className='mt-4 h-14 w-full bg-[#512da8] hover:bg-[#000] font-bold text-lg'>Swap</Button>
      ) : (
        <ConnectWallet lang={lang} className='w-full mt-4' />
      )}
    </div>
  )
}
