import React, { useState } from 'react'

const FFF: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [f, setF] = useState(0)

  return (
    <>
      <p>
        <span
          onClick={() => {
            setF(fv => fv + 1)
          }}>
          add f
        </span>
      </p>
      <p>{f}</p>
      {children}
    </>
  )
}

export default FFF
