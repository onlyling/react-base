import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import isEqual from 'fast-deep-equal';

import model0 from './test';

// 代码抄自 https://umijs.org/zh-CN/plugins/plugin-model
// 脱离 umi 框架也能一样玩
// umi 监听文件变化自动引入文件构建 models
// 使用方式
// import { useModel } from '@/models';
// const {} = useModel('models 的 key'); // 返回的就是对应 hook 返回的数据

/**
 * 所有的 model/hook，需要手动维护该数据
 */
const models = {
  test: model0,
};

type ModelsType = typeof models;

type ModelsKeyType = keyof ModelsType;

type Model<T extends keyof typeof models> = {
  [key in ModelsKeyType]: ReturnType<typeof models[T]>;
};

/** 数据缓存 */
class Dispatcher {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  public callbacks = {} as Record<ModelsKeyType, any>;

  /**
   * 所有的 hook 的数据都缓存到这里
   * 共享数据
   */
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  public data = {} as Record<ModelsKeyType, any>;

  public update = (namespace: ModelsKeyType) => {
    (this.callbacks[namespace] || []).forEach((callback: (val: any) => void) => {
      try {
        const data = this.data[namespace];
        callback(data);
      } catch (e) {
        callback(undefined);
      }
    });
  };
}

/** Context */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ModelContext = createContext({} as Dispatcher);

/**
 * 当前所有的数据源
 */
const dispatcher = new Dispatcher();

/**
 * 初始化所有 hook/model
 */
const Executor: React.FC<{
  namespace: ModelsKeyType;
  hook: () => any;
  onUpdate: (val: any) => void;
}> = ({ hook, onUpdate, namespace }) => {
  const UpdateRef = useRef(onUpdate);
  const InitialLoad = useRef(false);

  UpdateRef.current = onUpdate;

  let data: any;

  try {
    data = hook();
  } catch (error) {
    console.log(`${namespace} model failed:`);
    console.log(error);
  }

  useEffect(() => {
    UpdateRef.current(data);
    InitialLoad.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (InitialLoad.current) {
      UpdateRef.current(data);
    } else {
      InitialLoad.current = true;
    }
  });

  return null;
};

export function useModel<T extends keyof Model<T>>(model: T): Model<T>[T];
// eslint-disable-next-line no-redeclare
export function useModel<T extends keyof Model<T>, U>(
  model: T,
  selector: (model: Model<T>[T]) => U,
): U;

// eslint-disable-next-line no-redeclare
export function useModel<T extends keyof Model<T>, U>(
  namespace: T,
  updater?: (model: Model<T>[T]) => U,
): typeof updater extends undefined ? Model<T>[T] : ReturnType<NonNullable<typeof updater>> {
  type RetState = typeof updater extends undefined
    ? Model<T>[T]
    : ReturnType<NonNullable<typeof updater>>;

  const dispatcher = useContext(ModelContext);
  const updaterRef = useRef(updater);
  const [state, setState] = useState<RetState>(() =>
    updaterRef.current
      ? updaterRef.current(dispatcher.data![namespace])
      : dispatcher.data![namespace],
  );
  const stateRef = useRef<any>(state);

  updaterRef.current = updater;
  stateRef.current = state;

  useEffect(() => {
    const handler = (e: any) => {
      if (updater && updaterRef.current) {
        const currentState = updaterRef.current(e);
        const previousState = stateRef.current;
        if (!isEqual(currentState, previousState)) {
          setState(currentState);
        }
      } else {
        setState(e);
      }
    };
    try {
      dispatcher.callbacks![namespace]!.add(handler);
    } catch (e) {
      dispatcher.callbacks![namespace] = new Set();
      dispatcher.callbacks![namespace]!.add(handler);
    }
    return () => {
      dispatcher.callbacks![namespace]!.delete(handler);
    };
  }, [dispatcher.callbacks, namespace, updater]);

  return state;
}

/**
 * Model 的 Provider
 */
const ModelProvider: React.FC = ({ children }) => {
  return (
    <ModelContext.Provider value={dispatcher}>
      {Object.keys(models).map((key) => {
        const namespace = key as ModelsKeyType;

        return (
          <Executor
            key={namespace}
            namespace={namespace}
            hook={models[namespace]}
            onUpdate={(val) => {
              dispatcher.data[namespace] = val;
              dispatcher.update(namespace);
            }}
          />
        );
      })}

      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
