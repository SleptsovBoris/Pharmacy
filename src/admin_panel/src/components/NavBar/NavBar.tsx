import { Link } from 'react-router-dom';
import './NavBar.scss';

interface INavBarItem {
  title: string;
  link: string;
}

interface IProps {
  items: INavBarItem[];
  needStartAndEndIndention?: boolean;
}

const NavBar: React.FC<IProps> = (props: IProps) => {
  return (
    <div
      className="nav__bar"
      style={{
        margin: props.needStartAndEndIndention ? undefined : '0 -15px',
      }}
    >
      {props.items.map(item => (
        <div key={item.title} className="nav">
          <Link to={item.link}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
