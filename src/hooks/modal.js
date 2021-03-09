import { useEffect } from 'react';
const useModal = (handleClick, showFn) => {
  useEffect(() => {
    if (showFn) window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showFn]);
};

export default useModal;
