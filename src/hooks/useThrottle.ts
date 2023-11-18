import { useEffect, useMemo, useRef } from "react";

export function useThrottle(callback: Function, delay: number) {
  const lastExecTime = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>(null);
  const callbackRef = useRef<Function>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      // 清除定时器，确保在组件卸载时不会触发回调
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return useMemo(
    () =>
      function throttledCallback(...args: any[]) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime.current > delay) {
          callbackRef.current?.(...args);
          lastExecTime.current = currentTime;
        } else {
          // 如果在延迟时间内调用了函数，清除之前的定时器，并设置新的定时器
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          // @ts-ignore
          timerRef.current = setTimeout(() => {
            callbackRef.current?.(...args);
            lastExecTime.current = Date.now();
          }, delay);
        }
      },
    []
  );
}
