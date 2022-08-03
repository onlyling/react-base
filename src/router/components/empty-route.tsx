import type React from 'react'
import { useOutlet } from 'react-router-dom'

const EmptyRoute: React.FC = () => {
  const outlet = useOutlet()

  return outlet
}

export default EmptyRoute
