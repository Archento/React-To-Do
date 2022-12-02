import { useState } from 'react'

export function useSort (initialValue, max) {
  const [count, setCount] = useState(initialValue)

  const changeSort = () => setCount(current => count === max ? initialValue : current + 1)

  return { count, changeSort }
}
