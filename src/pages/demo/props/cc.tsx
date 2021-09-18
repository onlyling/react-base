import React, { useState, useEffect, memo } from 'react';
import { Modal } from 'antd';

import Dddd from './dd';

interface CCProps {
  visible: boolean;
  text: string;
  onClick: () => void;
  onClose: () => void;
}

const CC: React.FC<CCProps> = ({ visible, onClick, onClose, text }) => {
  console.log('-- CC --');
  const [ccc, setCCC] = useState('00000');
  const [ddVisible, setDDVisible] = useState(false);

  const onClickC = () => {
    console.log('onClickC');
    setDDVisible(true);
  };

  const onCloseC = () => {
    console.log('onCloseC');
    setDDVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      console.log('-- effect setCCC --');
      setCCC('3333');
    }, 2000);

    return () => {
      console.log('-- delete CC --');
    };
  }, []);

  return (
    <div>
      {visible ? 'show' : null}
      <p onClick={onClick}>323 - {ccc}</p>

      <p>
        <span onClick={onClickC}>ccc -- ddddd</span>
      </p>

      <Modal visible={visible} onCancel={onClose} footer={null}>
        Modal
      </Modal>

      <Dddd visible={ddVisible} onClose={onCloseC} text={text} />
    </div>
  );
};

export default memo(CC);
