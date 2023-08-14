'use client';

import { Button, Form, Radio, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { isLoading as loaders } from "@/redux/selectors";
import { setIsLoading } from "@/redux/loadersSlice";
import { Loader } from "@/components/Loader";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(loaders);
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.post('/api/users/login', values);
      message.success(response.data.message);
      router.push('/');
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      {isLoading ? <Loader /> : null}
      <div className="card p-3 w-450">
        <h1 className="text-xl">TolJobs - Login</h1>
        <hr />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label='Email' name='email'>
            <input type="email" className="input" />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <input type="password" className="input" />
          </Form.Item>

          <Button type='primary' htmlType='submit'>
            Login
          </Button>

          <Link href='/register'>
            Don&apos;t have an account? Register!
          </Link>
        </Form>
      </div>
    </div>
  )
}