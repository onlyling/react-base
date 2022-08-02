import type React from 'react'

const EmptyRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) =>
  children as React.ReactElement

export default EmptyRoute
