import { Space, Spin } from 'antd';
export default function Loading() {
  return (
    <div className=" bg-gray-light w-full  absolute opacity-50  max-w-6xl h-full justify-center flex ">
      <Space size="small">
        <Spin size="large" />
      </Space>
    </div>
  );
}
