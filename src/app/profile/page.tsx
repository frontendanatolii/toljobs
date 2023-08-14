'use client'
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import { Loader } from '@/components/Loader';
import { PageTitle } from '@/components/PageTitle';
import { setIsLoading } from '@/redux/loadersSlice';
import { isLoading as loaders, currentUser as users } from '@/redux/selectors';
import { setCurrentUser } from '@/redux/usersSlice';
import { Button, Form, message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(users);
  const { isLoading } = useSelector(loaders);

  const onFinish = async (values: any) => {
    try {
      values._id = currentUser._id;
      values.userType = currentUser.userType;
      dispatch(setIsLoading(true));
      const response = await axios.put('/api/users', values);
      dispatch(setCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div>
      {isLoading ? <Loader /> : null}
      <PageTitle title='Profile' />
      <Form layout='vertical' onFinish={onFinish}>
        {
          currentUser?.userType === 'employee'
            ? <EmployeeForm />
            : <EmployerForm />
        }

        <div className="flex justify-end my-3">
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}