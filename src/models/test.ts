import { useState } from 'react'

type TestStateType = {
  a: number
}

const useTest = () => {
  const [test, setTest] = useState<TestStateType>({ a: 1 })

  return { test, setTest }
}

export default useTest
