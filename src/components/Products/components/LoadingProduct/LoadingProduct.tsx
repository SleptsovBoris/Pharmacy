import { Divider, Skeleton, Space } from 'antd';
import './LoadingProduct.css';

const LoadingProduct: React.FC = () => {
  return (
    <div className="loading__product">
      <Skeleton.Image active style={{ width: 250, height: 250 }} />
      <br />
      <Skeleton.Input active size={'default'} />
      <Divider />
      <Skeleton.Input active size={'small'} />
      <br />
      <Space style={{ justifyContent: 'space-between' }}>
        <Skeleton.Button active style={{ width: 120 }} />
        <Skeleton.Button active style={{ width: 120 }} />
      </Space>
    </div>
  );
};

export default LoadingProduct;
