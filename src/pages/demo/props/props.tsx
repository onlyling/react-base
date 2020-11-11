import React, { useState, useEffect, useCallback } from 'react';

import CC from './cc';
import DD from './dd';

const Props: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [p, setP] = useState('1');
  const [ccVisible, setCCVisible] = useState(false);
  const [ddVisible, setDDVisible] = useState(false);

  console.log('-- Props --');

  const onClick = useCallback(() => {
    console.log('onClick');
    setCCVisible(true);
  }, []);

  const onClose = useCallback(() => {
    console.log('onClose');
    setCCVisible(false);
  }, []);

  const onClick2 = useCallback(() => {
    console.log('onClick2');
    setDDVisible(true);
  }, []);

  const onClose2 = useCallback(() => {
    console.log('onClose2');
    setDDVisible(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setP('2');
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <p>ppppp - {p}</p>

      <p>
        <span onClick={onClick2}>ddd</span>
      </p>

      <CC visible={ccVisible} onClick={onClick} onClose={onClose} text={p} />

      <DD visible={ddVisible} onClose={onClose2} text={p} />
    </div>
  );
};

export default Props;
