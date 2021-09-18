import React, { useState, useEffect, useCallback, useRef } from 'react';

import Cc from './cc';
import Dd from './dd';
import type { ImperativeRef } from './imperative';
import Imperative from './imperative';
import Fff from './fff';

const Props: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [p, setP] = useState('1');
  const [ccVisible, setCCVisible] = useState(false);
  const [ddVisible, setDDVisible] = useState(false);
  const IRef = useRef<ImperativeRef>(null);

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
      <p>
        <span
          onClick={() => {
            IRef.current?.show();
          }}
        >
          show IRef
        </span>
      </p>

      <p>ppppp - {p}</p>

      <p>
        <span onClick={onClick2}>ddd</span>
      </p>

      <Cc visible={ccVisible} onClick={onClick} onClose={onClose} text={p} />

      <Imperative ref={IRef} />

      <Fff>
        <Dd visible={ddVisible} onClose={onClose2} text={p} />
      </Fff>
    </div>
  );
};

export default Props;
