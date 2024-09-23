import {useEffect, useState} from 'react'

const ToUsdcPrice = ({ids, amount}: {ids: string; amount: number}) => {
  const [price, setPrice] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrice = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        // `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${ids}&vs_currencies=usd`
      )
      const data = await response.json()

      console.log(data)

      // 如果有有效的路线
      setPrice(data[ids].usd)
    } catch (err) {
      console.error('Failed to fetch price:', err)
      setError('Failed to fetch price')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPrice()
  }, [ids])

  if (loading) {
    return (
      <span className='absolute bottom-0 right-0 top-0 w-20 animate-pulse rounded bg-gray-100'></span>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return <span>${(amount * price)?.toFixed(2)}</span>
}

export {ToUsdcPrice}
