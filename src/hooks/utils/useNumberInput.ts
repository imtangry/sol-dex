export function useNumberInput(callback: (e: number) => void) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // 正则表达式用于匹配合法的数字，包括整数和小数
    const regex = /^\d*\.?\d*$/

    if (regex.test(inputValue)) {
      const numericValue = parseFloat(inputValue)
      if (!isNaN(numericValue)) {
        callback(numericValue)
      }
    }
  }
}
