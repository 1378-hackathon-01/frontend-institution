import * as bi from 'react-bootstrap-icons';
import { Flex } from 'components';
import { Link } from 'react-router';
import './style.scss';

interface IProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function CardLink(props: IProps) {
  return (
    <Link
      to={props.href}
      className='card-link-2804'
    >
      <Flex
        justifyContent='space-between'
        alignItems='center'
        gap={10}
      >
        <Flex
          alignItems='center'
          gap={5}
        >
          <div className='icon-9aju'>{props.icon}</div>
          <div>{props.label}</div>
        </Flex>

        <bi.ChevronRight />
      </Flex>
    </Link>
  );
}

export default CardLink;
