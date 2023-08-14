'use client'

import { PageTitle } from "@/components/PageTitle";
import { setIsLoading } from "@/redux/loadersSlice";
import { Button, Table, Tooltip, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Applications from '@/components/Applications';

export default function Jobs() {
  const [selectedJob = {}, setSelectedJob] = useState({} as any);
  const [showApplications = false, setShowApplications] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.users);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const getJobs = async () => {
    if (currentUser?._id) {
      try {
        dispatch(setIsLoading(true));
        const response = await axios.get(`/api/jobs?user=${currentUser._id}`);
        setJobs(response.data.data);
        message.success(response.data.message);
      } catch (error: any) {
        message.error(error.response?.data.message || 'Something went wrong');
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.delete(`/api/jobs/${jobId}`);
      message.success(response.data.message);
      getJobs();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    getJobs();
  }, [currentUser]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
    },
    {
      title: "Work Mode",
      dataIndex: "workMode",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-3">
          <Tooltip title="Delete">
            <i
              className="ri-delete-bin-line"
              onClick={() => deleteJob(record._id)}
            ></i>
          </Tooltip>
          <Tooltip title="Edit">
            <i
              className="ri-pencil-line"
              onClick={() => router.push(`/jobs/edit/${record._id}`)}
            ></i>
          </Tooltip>
          <Tooltip title="Applications">
            <i
              className="ri-file-list-3-line"
              onClick={() => {
                setSelectedJob(record);
                setShowApplications(true);
              }}
            ></i>
          </Tooltip>
        </div>
      ),
    },
  ];


  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Jobs" />
        <Button type="primary" onClick={() => router.push('/jobs/new')}>
          New job
        </Button>
      </div>

      <div className="my-2">
        <Table columns={columns} dataSource={jobs} />
      </div>

      {showApplications && (
        <Applications
          selectedJob={selectedJob}
          setShowApplications={setShowApplications}
          showApplications={showApplications}
        />
      )}
    </div>
  )
}