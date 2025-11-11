import { Link } from 'react-router';
import * as bi from 'react-bootstrap-icons';
import { Flex, Header, Logo } from 'components';
import { RoutingUrls } from 'common/const';
import { createClassName } from 'common/helpers';
import './style.scss';

interface IProps {
  institutionAbbreviation: string;
}

function Navbar(props: IProps) {
  return (
    <div>
      <NavbarBody abbreviation={props.institutionAbbreviation} />
      <NavbarBody
        abbreviation={props.institutionAbbreviation}
        hidden
      />
    </div>
  );
}

function NavbarBody(props: { hidden?: boolean; abbreviation: string }) {
  const className = createClassName('navbar-22ln', props.hidden ? 'hidden-iigm' : 'fixed-67af');

  return (
    <Flex
      className={className}
      justifyContent='space-between'
      alignItems='center'
    >
      <Link to={RoutingUrls.Main}>
        <Logo
          size={{ width: 5 }}
          color='custom'
        />
      </Link>

      <Header className='abbr-3cpi'>{props.abbreviation}</Header>

      <Flex gap={10}>
        <NavbarLink
          icon={<bi.Radar />}
          label='Факультеты'
          href={RoutingUrls.Faculties}
        />
      </Flex>
    </Flex>
  );
}

function NavbarLink(props: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      to={props.href}
      className='navbar-link-1u7k'
    >
      <Flex
        direction='column'
        alignItems='center'
      >
        <div className='icon-qvre'>{props.icon}</div>
        <div className='desc-jcxp'>{props.label}</div>
      </Flex>
    </Link>
  );
}

export default Navbar;
