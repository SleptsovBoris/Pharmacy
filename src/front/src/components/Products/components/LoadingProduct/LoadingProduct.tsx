import { Divider, Skeleton, Space } from 'antd';
import './LoadingProduct.css';

const LoadingProduct: React.FC = () => {
  return (
    <div className="loading__product">
      <Skeleton.Image
        active
        style={{ width: '100%', aspectRatio: 1, height: 'auto' }}
      />
      <br />
      <Skeleton.Input active size={'default'} style={{ width: '100%' }} />
      <Divider />
      <Skeleton.Input active size={'small'} style={{ width: '65%' }} />
      <br />
      <Space style={{ justifyContent: 'space-between' }}>
        <Skeleton.Button active className="custom-skeleton-button-style" />
        <Skeleton.Button active className="custom-skeleton-button-style" />
      </Space>
    </div>
  );
};

export default LoadingProduct;
