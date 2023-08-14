"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";
import { Button, Form, message } from "antd";
import JobPostForm from "@/components/JobPostForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setIsLoading } from "@/redux/loadersSlice";

function EditJob() {
  const [jobData, setJobData] = useState<any>(null);
  const router = useRouter();

  const { jobid } = useParams();

  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      values._id = jobid;
      dispatch(setIsLoading(true));
      const response = await axios.put(`/api/jobs/${jobid}`, values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchJob = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    jobData && (
      <div>
        <div className="flex justify-between items-center">
          <PageTitle title="Edit Job Post" />
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
          <JobPostForm />

          <div className="flex justify-end items-center gap-3 my-3">
            <Button type="default" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update Job
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default EditJob;