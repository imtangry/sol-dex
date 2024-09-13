import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {Button} from "@/components/ui/button";
import {SwapAsset} from "@/components/swap/SwapCard";
import { useState } from 'react';

export default function TokenListDialog({ token, tokenList, onChange}: { tokenList: SwapAsset[], token: SwapAsset, onChange: (value: SwapAsset) => void }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant='outline'
                    size='rounded'
                    className='transition w-12 h-12 hover:-translate-y-[2px] ease-in-out duration-400 rounder-full overflow-hidden'
                >
                    <img
                        className='w-full h-full'
                        src={token.logoURI}
                        alt='icon'
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className='w-[480px] h-[700px] flex flex-col pr-0 pb-0 pl-4'>
                <DialogHeader>
                    <DialogTitle>选择 Token</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col overflow-auto space-y-4 pb-2 pr-2'>
                    {tokenList.map((item, index) => (
                        <div
                            key={index}
                            className='w-full flex items-center rounded-lg bg-white dark:bg-gray-800 cursor-pointer dark:hover:bg-gray-600 p-2'
                            onClick={() => {
                                onChange({...item, value: '0'})
                                setOpen(false)
                            }}
                        >
                            <div className='min-w-11 min-h-11 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden'>
                                <img
                                    className='w-10 h-10'
                                    src={item.logoURI}
                                    alt='icon'
                                />
                            </div>
                            <div className='flex flex-col justify-between ml-2 overflow-hidden'>
                                <div className='font-bold text-lg'>{item.symbol}</div>
                                <div className='text-gray-500 text-xs'>{item.name}</div>
                            </div>
                            <div className='flex-1 ml-auto flex items-center text-gray-500 text-xs ellipsis pl-2'>
                                {item.address}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
