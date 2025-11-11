type LoaderSize = 'small' | 'default';
type LoaderColor = '01' | '02' | 'background-01' | 'background-02';

interface ILoaderProps {
  size: LoaderSize;
  color: LoaderColor;
}

export default ILoaderProps;
