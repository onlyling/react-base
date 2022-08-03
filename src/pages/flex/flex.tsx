import React from 'react'

import Styles from './flex.less'

const mocks = new Array(20).fill(0).map((_, i) => i)

const Flex: React.FC = () => {
  return (
    <div className={Styles.wrapper}>
      {mocks.map(i => (
        <div key={i} className={Styles.item} />
      ))}
    </div>
  )
}

export default Flex
