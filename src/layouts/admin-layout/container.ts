import { createContainer } from 'unstated-next';
import { useState } from 'react';

const useCounter = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return { openKeys, setOpenKeys, selectedKeys, setSelectedKeys };
};

const Counter = createContainer<ReturnType<typeof useCounter>, {}>(useCounter);

export type CounterType = typeof useCounter;

export { useCounter };

export default Counter;
