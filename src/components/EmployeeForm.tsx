"use client";

import { Col, Form, Row, Button } from "antd";
import { useSelector } from "react-redux";
import { currentUser as users } from "@/redux/selectors";

export default function EmployeeForm() {
  const { currentUser } = useSelector(users);

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={8}>
					<Form.Item
						label='Name'
						name='name'
						rules={[{ required: true, message: "Please, enter your name" }]}
            initialValue={currentUser.name}
					>
						<input type='text' />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label='Email'
						name='email'
						rules={[{ required: true, message: "Please, enter your email" }]}
            initialValue={currentUser.email}
					>
						<input type='email' />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label='Phone' name='phone'>
						<input type='num' />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item label='Carrier objective' name='carrierObjective'>
						<textarea />
					</Form.Item>
				</Col>
			</Row>

			<div
        style={{
          marginTop: '50px'
        }}
      >

        {/* EDUCATION */}
        <h1 className="text-md">Education</h1>
				<Form.List name='education'>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Row key={key} gutter={[16, 16]} align='bottom'>
									<Col span={8}>
										<Form.Item
											{...restField}
											name={[name, "qualification"]}
											rules={[{ required: true, message: "Required" }]}
											label='Qualification'
										>
											<input type='text' />
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item
											{...restField}
											name={[name, "institution"]}
											rules={[{ required: true, message: "Required" }]}
											label='Institution'
										>
											<input type='text' />
										</Form.Item>
									</Col>
									<Col span={4}>
										<Form.Item
											{...restField}
											name={[name, "percentage"]}
											rules={[{ required: true, message: "Required" }]}
											label='Percentage'
										>
											<input type='number' />
										</Form.Item>
									</Col>

									<i
										className='ri-delete-bin-2-line'
										onClick={() => remove(name)}
									></i>
								</Row>
							))}
							<Form.Item className="my-2">
								<Button type='dashed' onClick={() => add()} block>
									Add education
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>


        {/* SKILLS*/}
        <h1 className="text-md">Skills</h1>
				<Form.List name='skills'>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Row key={key} gutter={[16, 16]} align='bottom'>
									<Col span={8}>
										<Form.Item
											{...restField}
											name={[name, "technology"]}
											rules={[{ required: true, message: "Required" }]}
											label='Technology'
										>
											<input type='text' />
										</Form.Item>
									</Col>
									<Col span={4}>
										<Form.Item
											{...restField}
											name={[name, "rating"]}
											rules={[{ required: true, message: "Required" }]}
											label='Rating'
										>
											<input type='number' />
										</Form.Item>
									</Col>

									<i
										className='ri-delete-bin-2-line'
										onClick={() => remove(name)}
									></i>
								</Row>
							))}
							<Form.Item className="my-2">
								<Button type='dashed' onClick={() => add()} block>
									Add skill
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>

        {/* EXPERIENCE*/}
        <h1 className="text-md">Experience</h1>
				<Form.List name='experience'>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Row key={key} gutter={[16, 16]} align='bottom'>
									<Col span={8}>
										<Form.Item
											{...restField}
											name={[name, "company"]}
											rules={[{ required: true, message: "Required" }]}
											label='Company name'
										>
											<input type='text' />
										</Form.Item>
									</Col>
                  <Col span={8}>
										<Form.Item
											{...restField}
											name={[name, "institution"]}
											rules={[{ required: true, message: "Required" }]}
											label='Institution'
										>
											<input type='text' />
										</Form.Item>
									</Col>
									<Col span={4}>
										<Form.Item
											{...restField}
											name={[name, "period"]}
											rules={[{ required: true, message: "Required" }]}
											label='Period'
										>
											<input type='text' />
										</Form.Item>
									</Col>

									<i
										className='ri-delete-bin-2-line'
										onClick={() => remove(name)}
									></i>
								</Row>
							))}
							<Form.Item className="my-2">
								<Button type='dashed' onClick={() => add()} block>
									Add experience
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</div>
		</>
	);
}
