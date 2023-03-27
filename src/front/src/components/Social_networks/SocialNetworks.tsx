import Icon from '@ant-design/icons/lib/components/Icon';
import { Button } from 'antd';
import { openUrl } from 'utils/openUrl';
import './SocialNetworks.scss';

interface ISocialNetwork {
  icon: string;
  src: string;
}

interface IProps {
  items: ISocialNetwork[];
}

const SocialNetworks: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="social__networks">
      {props.items.map(item => (
        <div key={item.icon}>
          <Button
            type="ghost"
            className="social__network"
            shape="circle"
            onClick={() => {
              openUrl(item.src, true);
            }}
            icon={
              <Icon
                component={() => (
                  <img className="social__network__image" src={item.icon} />
                )}
              />
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SocialNetworks;
