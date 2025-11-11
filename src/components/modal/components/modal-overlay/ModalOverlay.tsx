import { useEffect, useState } from 'react';
import './style.scss';

interface IModalOverlayProps {
  children?: React.ReactNode;
}

function ModalOverlay(props: IModalOverlayProps) {
  const [scrollY] = useState(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', preventScroll);
    return () => {
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

  const preventScroll = (e: Event) => {
    e.preventDefault();
    window.scrollTo(0, scrollY);
  };

  return <div className='m-cntr-Y5gs'>{props.children}</div>;
}

export default ModalOverlay;
