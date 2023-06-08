import { Skeleton } from 'antd';
import './LoadingOrder.scss';

const LoadingOrder: React.FC = () => {
  return (
    <div className="loading__order">
      <Skeleton.Input active size={'default'} style={{ width: '100%' }} />
      <Skeleton.Input active size={'default'} style={{ width: '100%' }} />
      <Skeleton.Input active size={'default'} style={{ width: '100%' }} />
      <Skeleton.Input active size={'default'} style={{ width: '100%' }} />
    </div>
  );
};

export default LoadingOrder;
