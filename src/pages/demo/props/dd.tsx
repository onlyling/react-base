import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

interface DDProps {
  visible: boolean;
  text: string;
  onClose: () => void;
}

const DD: React.FC<DDProps> = ({ visible, onClose, text }) => {
  console.log('-- DD --');
  const [DDD, setDDD] = useState('00000');

  useEffect(() => {
    setTimeout(() => {
      setDDD(text);
    }, 2000);
  }, [text]);

  return (
    <div>
      {visible ? 'show' : null}

      <Modal visible={visible} onCancel={onClose} footer={null}>
        {DDD}
      </Modal>
    </div>
  );
};

export default DD;
