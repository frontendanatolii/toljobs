'use client'

import { PageTitle } from "@/components/PageTitle";
import { setIsLoading } from "@/redux/loadersSlice";
import { currentUser as users } from "@/redux/selectors";
import { Button, Col, Divider, Row, message } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function JobInfoPage() {
  const [jobData, setJobData] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  console.log(applications);
  const { currentUser } = useSelector(users);
  const router = useRouter();

  const { jobId } = useParams();

  const dispatch = useDispatch();

  const fetchApplications = async () => {
    if (currentUser?._id) {
      try {
        dispatch(setIsLoading(true));
        const response = await axios.get(
          `/api/applications?job=${jobId}&user=${currentUser?._id}`
        );
        setApplications(response.data.data);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  };

  const fetchJob = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.get(`/api/jobs/${jobId}`);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
    fetchApplications();
  }, [isApplied]);

  const onApply = async () => {
    if (currentUser?._id) {
      try {
        dispatch(setIsLoading(true));
        const response = await axios.post(`/api/applications`, {
          user: currentUser?._id,
          job: jobData._id,
          status: "pending",
        });
        setIsApplied(true);
        message.success(response.data.message);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  };

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row gutter={[16, 16]} className="gap-3">
          <Col span={12} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Company</span>
              <span>{jobData.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{jobData.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
              </span>
            </div>
            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{jobData.workMode}</span>
            </div>
            <div className="flex justify-between">
              <span>Jop Type</span>
              <span>{jobData.jobType}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{jobData.experience} Years</span>
            </div>
          </Col>

          <Col span={24} className="flex flex-col gap-2">
            <h1 className="text-md">Job Description</h1>
            <Divider />
            <span>{jobData.description}</span>
            {applications.length > 0 && (
              <span className="my-3 info p-3">
                You have already applied for this job. Please wait for the
                employer to respond.
              </span>
            )}
            <div className="flex justify-end gap-3">
              <Button type="default" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="default"
                onClick={() => router.push(`/userinfo/${jobData.user._id}`)}
              >
                View Company Info
              </Button>
              <Button
                type="primary"
                onClick={onApply}
                disabled={
                 currentUser?.userType === "employer" || applications.length > 0
                }
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  )
}