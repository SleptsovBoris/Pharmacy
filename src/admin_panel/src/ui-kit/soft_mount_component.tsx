import { cloneElement } from 'react';

interface IProps {
  isMounted: boolean;
  children: React.ReactElement;
}

const SoftMountComponent: React.FC<IProps> = (props: IProps) => {
  const mountedStyle = { opacity: 1, transition: 'opacity 500ms ease-in' };
  const unmountedStyle = { opacity: 0, transition: 'opacity 500ms ease-in' };

  return (
    <>
      {cloneElement(props.children, {
        style: props.isMounted ? mountedStyle : unmountedStyle,
      })}
    </>
  );
};

export default SoftMountComponent;
