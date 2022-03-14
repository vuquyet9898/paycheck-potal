import { Button, Form, Input } from 'antd'
import Loading from 'src/Components/Loading/Loading'

export default function SignIn() {
  const isLoading = false
  return (
    <div className="h-full justify-center items-center flex w-full">
      <div className="drop-shadow-lg py-10 bg-white px-40  rounded-md ">
        <Form
          className="w-full"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ personal_id: '053605416', password: '123456' }}
          onFinish={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="Personal id"
            name="personal_id"
            rules={[
              { required: true, message: 'Please input your personal id!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {isLoading && <Loading />}
    </div>
  )
}
