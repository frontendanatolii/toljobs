'use client'
import { Button, Form, Radio, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { isLoading as loaders } from "@/redux/selectors";
import { setIsLoading } from "@/redux/loadersSlice";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(loaders);
  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.post('/api/users/register', values);
      message.success(response.data.message);
      router.push('/login');
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      {isLoading ? <Loader /> : null}
      <div className="card p-3 w-450">
        <h1 className="text-xl">TolJobs - Register</h1>
        <hr />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label='Register as' name='userType'>
            <Radio.Group>
              <Radio value='employer'>Employer</Radio>
              <Radio value='employee'>Employee</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Name' name='name'>
            <input type="text" className="input" />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <input type="email" className="input" />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <input type="password" className="input" />
          </Form.Item>

          <Button type='primary' htmlType='submit'>
            Register
          </Button>

          <Link href='/login'>
            Already have an account? Login!
          </Link>
        </Form>
      </div>
    </div>
  )
}