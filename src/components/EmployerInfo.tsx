import { Col, Row } from "antd";
import React from "react";
import { Divider } from "./Divider";

function EmployerInfo({ employerInfo }: { employerInfo: any }) {
  return (
    <Row>
      <Col span={12}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>Company Name</span>
            <span>{employerInfo.name}</span>
          </div>
          {employerInfo.establishmentYear ? (
            <div className="flex justify-between">
              <span>Establishment Year</span>
              <span>{employerInfo.establishmentYear}</span>
            </div>
          ) : null}
          {employerInfo.companySize ? (
            <div className="flex justify-between">
              <span>Company Size</span>
              <span>{employerInfo.companySize}</span>
            </div>
           ) : null }
          <div className="flex justify-between">
            <span>Email</span>
            <span>{employerInfo.email}</span>
          </div>

          {employerInfo.phone ? (
            <div className="flex justify-between">
              <span>Phone</span>
              <span>{employerInfo.phone}</span>
            </div>
          ) : null}

          {employerInfo.website ? (
            <div className="flex justify-between">
              <span>Website</span>
              <span>{employerInfo.website}</span>
            </div>
          ) : null}

          {employerInfo.address ? (
            <div className="flex justify-between">
              <span>Address</span>
              <span>{employerInfo.address}</span>
            </div>
          ) : null}
        </div>
      </Col>

      <Col span={24} className="my-3">
        <Divider />
        <h1 className="text-md">
          <b>About</b>
        </h1>

        <span>{employerInfo.about}</span>
      </Col>
    </Row>
  );
}

export default EmployerInfo;