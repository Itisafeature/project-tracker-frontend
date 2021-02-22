import { useEffect } from 'react';

const useOnClick = (ref, handler) => {
  debugger;
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      //   return;
      // }

      handler();
    };

    console.log('here');

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClick;
