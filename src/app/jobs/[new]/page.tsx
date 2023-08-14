'use client'

import JobPostForm from "@/components/JobPostForm";
import { PageTitle } from "@/components/PageTitle";
import { setIsLoading } from "@/redux/loadersSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function NewJob() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.post('/api/jobs', values);
      message.success('Successfully add new job post');
      router.push('/jobs');
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="New job" />
        <Button type="default" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <JobPostForm />
        <div className="flex justify-end items-center gap-3 my-3">
          <Button type="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Post Job
          </Button>
        </div>
      </Form>
    </div>
  );
}
