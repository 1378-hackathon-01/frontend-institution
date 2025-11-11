import { memo, useState } from 'react';
import * as bi from 'react-bootstrap-icons';
import { Box } from 'components';
import './style.scss';

type InputType = 'text' | 'password' | 'date' | 'number' | 'email' | 'button';

interface IProps {
  value?: string;
  onChange?: (text: string) => void;
  onInput?: (text: string) => void;
  onClick?: () => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLElement>) => void;
  type: InputType;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: boolean;
  errorText?: string;
  className?: string;
  readonly?: boolean;
  disabled?: boolean;
}

function Input(props: IProps) {
  const [type, setType] = useState<InputType>(props.type);

  const handlePasswordVisibilitySwitchClick = () => {
    if (props.type !== 'password') {
      return;
    }

    if (type === 'password') {
      setType('text');
    } else if (type === 'text') {
      setType('password');
    }
  };

  const className = props.className != null ? `input-4Ys ${props.className}` : 'input-4Ys';

  return (
    <div className={className}>
      {props.label != null && <span className='l-Nx18'>{props.label}</span>}
      <Box
        variant='darker'
        shadow='inside'
        className='i-box-ns4'
        onClick={props.onClick}
      >
        {props.icon != null && <div className='i-ySh1'>{props.icon}</div>}
        {props.type === 'password' && props.value != null && props.value.length > 0 && (
          <div
            className='i-p-s-Bshf'
            onClick={handlePasswordVisibilitySwitchClick}
          >
            {type === 'password' ? <bi.Eye /> : <bi.EyeSlash />}
          </div>
        )}
        <input
          type={type}
          className='i-5Hsy'
          value={props.value}
          readOnly={props.readonly}
          onChange={(e) => props.onChange?.(e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => props.onInput?.(e.target.value)}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onKeyUp={props.onKeyUp}
        />
      </Box>
      {props.error && <div className='e-Nhs2'>{props.errorText}</div>}
    </div>
  );
}

export default Input;
