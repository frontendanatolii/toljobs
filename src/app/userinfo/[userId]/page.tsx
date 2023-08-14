"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/redux/loadersSlice";
import axios from "axios";
import { message } from "antd";
import { PageTitle } from "@/components/PageTitle";
import EmployerInfo from "@/components/EmployerInfo";
import EmployeeInfo from "@/components/EmployeeInfo";

function UserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const { userId } = useParams();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.get(`/api/users/${userId}`);
      setUserInfo(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo.userType === "employer" ? "Employer" : "Employee"
          } Info`}
        />

        {userInfo.userType === "employer" ? (
          <EmployerInfo employerInfo={userInfo} />
        ) : (
          <EmployeeInfo
            employeeInfo={userInfo}
          />
        )}
      </div>
    )
  );
}

export default UserInfo;