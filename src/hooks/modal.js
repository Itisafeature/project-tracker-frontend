import { useEffect } from 'react';
const useModal = (ref, setFn, showFn, obj) => {
  useEffect(() => {
    const handleModalOffClick = e => {
      if (
        e.target &&
        ref.current &&
        e.target !== ref.current &&
        !ref.current.contains(e.target)
      ) {
        obj ? setFn(obj) : setFn();
      }
    };
    if (showFn) window.addEventListener('click', handleModalOffClick);
    return () => window.removeEventListener('click', handleModalOffClick);
  }, [showFn]);
};

export default useModal;
