import React, { createContext, useContext, useMemo } from 'react';
import { useModel } from '@/models';

const NumberContext = createContext<number>(0);

export const Provider: React.FC = ({ children }) => {
  const { test } = useModel('test');
  const value = useMemo(() => {
    return test.a + 1000;
  }, [test]);

  return <NumberContext.Provider value={value}>{children}</NumberContext.Provider>;
};

export const CCCC: React.FC = () => {
  const cc = useContext(NumberContext);

  return <p>{cc}</p>;
};
