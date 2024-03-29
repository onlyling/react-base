import React, { createContext, useContext, useMemo } from 'react'

import { useModel } from '@/models'

const NumberContext = createContext<number>(0)

export const Provider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { test } = useModel('test')
  const value = useMemo(() => {
    return test.a + 1000
  }, [test])

  return (
    <NumberContext.Provider value={value}>{children}</NumberContext.Provider>
  )
}

export const Ccc: React.FC = () => {
  const cc = useContext(NumberContext)

  return <p>{cc}</p>
}
