import React, { useState } from "react";
import {
  Button,
  Card,
  Empty,
  Form,
  InputNumber,
  message,
  Select,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoCopy } from "react-icons/io5";
import generateDummyData from "../../components/generateDummyData";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const JsonGenerator = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState("");

  const generateData = (value) => {
    const temp = [];

    for (let i = 0; i < value.noOfData; i++) {
      temp.push(generateDummyData(value.data));
    }

    const str = JSON.stringify(temp, null, 2);
    setPayload(str);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(payload);
    message.success("Data copied");
  };

  return (
    <div className="bg-gray-200 py-5 min-h-screen">
      <div
        className="absolute top-2.5 lg:top-6 left-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="w-6 h-6" />
      </div>
      <div className="sm:w-9/12 w-full mx-auto space-y-5 p-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Dummy JSON Data Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Easily generate realistic dummy JSON data for users, products,
            payments, and employees. This tool is perfect for developers and
            testers who need mock data for frontend development, API testing,
            demos, and prototyping — fast, flexible, and ready to copy or
            download.
          </p>
        </div>
        <div>
          <Card>
            <Form
              className="flex flex-col sm:flex-row gap-3"
              layout="vertical"
              onFinish={generateData}
              initialValues={{
                data: "users",
                noOfData: 10,
              }}
            >
              <Form.Item
                label="Choose Data"
                name={"data"}
                rules={[{ required: true }]}
                className="w-full"
              >
                <Select size="large" placeholder="Choose Data">
                  <Select.Option value="users">User</Select.Option>
                  <Select.Option value="products">Products</Select.Option>
                  <Select.Option value="payment">Payment</Select.Option>
                  <Select.Option value="employees">Employees</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Number of Data"
                name={"noOfData"}
                rules={[{ required: true }]}
                className="w-full"
              >
                <InputNumber
                  size="large"
                  placeholder="Enter number of data"
                  style={{ width: "100%" }}
                  max={100}
                />
              </Form.Item>
              <Form.Item label=" ">
                <Button size="large" type="primary" htmlType="submit">
                  Generate
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div>
          {payload.length === 0 ? (
            <Empty description="Click generate to get your first payload." />
          ) : (
            <Card
              title="Users"
              extra={
                <Tooltip title="Copy data">
                  <IoCopy className="w-5 h-5 cursor-pointer" onClick={onCopy} />
                </Tooltip>
              }
            >
              <SyntaxHighlighter className="w-full h-[50vh]"
                language="json"
                style={atomOneDark}
                showLineNumbers
              >
                {payload}
              </SyntaxHighlighter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonGenerator;
