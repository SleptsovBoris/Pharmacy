import "./NavBar.css";
import { HashLink } from 'react-router-hash-link';

interface INavBarItem{
    title: string;
    link: string;
}

interface IProps{
    items: INavBarItem[];
}

const NavBar: React.FC<IProps> = (props) => {
    return(
        <div className="nav__bar">
            {
                props.items.map((item) => 
                    <div 
                        key={item.title} 
                        className="nav"
                    >
                        <HashLink 
                        to={item.link}
                        smooth
                        >
                            {item.title}
                        </HashLink>
                    </div>
                )
            }
        </div>
    );
}

export default NavBar;