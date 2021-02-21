import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnType<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T): ReturnType => {
  const [value, setValue] = useState(initialData);
  const hanlder = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, hanlder, setValue];
};

export default useInput;
