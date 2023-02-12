import './NavBar.css';
import { HashLink } from 'react-router-hash-link';

interface INavBarItem {
  title: string;
  link: string;
}

interface IProps {
  items: INavBarItem[];
  needStartAndEndIndention?: boolean;
}

const NavBar: React.FC<IProps> = (props: IProps) => {
  const scrollToElement = (el: HTMLElement) => {
    const headerOffSet = window.innerHeight * 0.1;
    const elementPositionFromTop = el.offsetTop - headerOffSet;
    window.scrollTo({
      top: elementPositionFromTop,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="nav__bar"
      style={{ margin: props.needStartAndEndIndention ? undefined : '0 -15px' }}
    >
      {props.items.map(item => (
        <div key={item.title} className="nav">
          <HashLink to={item.link} scroll={scrollToElement}>
            {item.title}
          </HashLink>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
