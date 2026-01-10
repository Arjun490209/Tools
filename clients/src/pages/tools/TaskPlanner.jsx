import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
} from "antd";
import moment from "moment";
import { usePlanner } from "../../store/usePlanner";
const des =
  "Test the layout with dummy data to verify proper rendering and smooth user experience.";
const TaskPlanner = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());
  const { tasks, addTask, deleteTask, updateStatus, deleteAllTask} = usePlanner();
  const highestTasks = tasks.filter((item) => item.priority === "highest");
  const mediumTasks = tasks.filter((item) => item.priority === "medium");
  const lowestTasks = tasks.filter((item) => item.priority === "lowest");

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const createTask = (value) => {
    value.status = "pending";
    value.id = Date.now();
    value.createdAt = new Date();
    addTask(value);
    handleClose();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);



  return (
    <div className="min-h-screen bg-gray-200 overflow-hidden flex justify-center">
      <nav className="text-white bg-gradient-to-r from-rose-600 via-slate-800 to-slate-900 h-15 fixed top-0 left-0 w-full flex justify-between items-center px-1 sm:px-4 lg:px-8">
        <div className="flex items-center gap-0.5 md:gap-2">
          <button className="w-10 h-10 bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_50%,_hsl(269_81%_48%)_100%)] text-white font-bold rounded-full ">
            TP
          </button>
          <h1 className="text-2xl font-bold flex gap-1.5">
            <span className=" hidden md:block">Task </span>Planner
          </h1>
        </div>

        <div className="flex justify-center items-center gap-1 md:gap-2.5">
          <h1 className="text-2xl font-bold hidden md:block">{timer}</h1>
          <div className=" hidden md:block"><DatePicker className="!py-1.5" /></div>
          <button
            className="focus:shadow-lg hover:scale-105 transition-all duration-200 items-center text-sm py-2 bg-gradient-to-tr from-blue-500 via-violet-500 to-blue-500 text-white font-medium px-3 rounded-sm"
            onClick={() => setOpen(true)}
          >
            + Add task
          </button>
          <Popconfirm title="Do you want to delete all tasks ?" onConfirm={()=>deleteAllTask()}>
          <button
            className="focus:shadow-lg hover:scale-105 transition-all duration-200 items-center text-sm py-2 bg-gradient-to-tr from-rose-500 via-red-500 to-rose-500 text-white font-medium px-3 rounded-sm"
            
          >
           🗑️ Delete All
          </button>
          </Popconfirm>
        </div>
      </nav>

      <section className="w-full h-[calc(100vh-60px)] p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 overflow-x-auto overflow-y-hidden md:grid-cols-3 gap-5 mt-15">
        {/* Hightest Card */}
        <div className=" h-full rounded-lg shadow-lg scroll-smooth  border border-white shadow-white overflow-y-auto overflow-x-hidden px-3 py-5">
          <Badge.Ribbon
            text="Highest"
            style={{
              background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
              color: "white",
              zIndex: 99,
            }}
          />
          <div className="h-150  rounded-lg space-y-5">
            <div className=" space-y-8 flex flex-col gap-5">
              {highestTasks.length === 0 && (
                <>
                  <Empty description="There is no task added as highest priority" />
                  <button
                    className=" w-fit mx-auto focus:shadow-lg hover:scale-105 transition-all duration-200 items-center text-sm py-2 bg-gradient-to-tr from-blue-500 via-violet-500 to-blue-500 text-white font-medium px-3 rounded-sm"
                    onClick={() => setOpen(true)}
                  >
                    + Add task
                  </button>
                </>
              )}
              {highestTasks.map((item, index) => (
                <Card key={index}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <label
                    htmlFor=""
                    className="text-slate-600 text-xs flex justify-end mt-1.5"
                  >
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                  <div className="mt-3 flex justify-between items-center">
                    <div className=" flex gap-1.5">
                      <Tag
                        className={`capitalize ${
                          item.status === "pending"
                            ? "!border-gray-400 !text-gray-500"
                            : item.status === "inProgress"
                            ? "!border-red-500 !text-red-500"
                            : item.status === "completed"
                            ? "!border-green-500 !text-green-500"
                            : ""
                        }`}
                      >
                        {item.status}
                      </Tag>

                     <Popconfirm
                        title="Do you want to delete this tasks ?"
                        onConfirm={()=>deleteTask(item.id)}
                      >
                        <Tag className="!bg-rose-600 !border-rose-600 !text-white !cursor-pointer">
                          Delete
                        </Tag>
                      </Popconfirm>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change Status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        In Progress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Medium card */}
        <div className=" h-full rounded-lg shadow-lg scroll-smooth  border border-white shadow-white overflow-y-auto overflow-x-hidden px-3 py-5">
          <Badge.Ribbon
            text="Medium"
            style={{
              background: "linear-gradient(135deg, #7f00ff, #00c6ff)",
              color: "white",
              zIndex: 99,
            }}
          />
          <div className="h-150  rounded-lg space-y-5">
            <div className=" space-y-8 flex flex-col gap-5">
              {mediumTasks.length === 0 && (
                <>
                  <Empty description="There is no task added as Medium priority" />
                  <button
                    className=" w-fit mx-auto focus:shadow-lg hover:scale-105 transition-all duration-200 items-center text-sm py-2 bg-gradient-to-tr from-blue-500 via-violet-500 to-blue-500 text-white font-medium px-3 rounded-sm"
                    onClick={() => setOpen(true)}
                  >
                    + Add task
                  </button>
                </>
              )}

              {mediumTasks.map((item, index) => (
                <Card key={index}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <label
                    htmlFor=""
                    className="text-slate-600 text-xs flex justify-end mt-1.5"
                  >
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                  <div className="mt-3 flex justify-between items-center">
                    <div className=" flex gap-1.5">
                      <Tag
                        className={`capitalize ${
                          item.status === "pending"
                            ? "!border-gray-400 !text-gray-500"
                            : item.status === "inProgress"
                            ? "!border-red-500 !text-red-500"
                            : item.status === "completed"
                            ? "!border-green-500 !text-green-500"
                            : ""
                        }`}
                      >
                        {item.status}
                      </Tag>
                      <Popconfirm
                        title="Do you want to delete this tasks ?"
                        onConfirm={()=>deleteTask(item.id)}
                      >
                        <Tag className="!bg-rose-600 !border-rose-600 !text-white !cursor-pointer">
                          Delete
                        </Tag>
                      </Popconfirm>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change Status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        In Progress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Lowest Cord */}
        <div className=" h-full rounded-lg shadow-lg scroll-smooth  border border-white shadow-white overflow-y-auto overflow-x-hidden px-3 py-5">
          <Badge.Ribbon
            text="Lowest"
            style={{
              background: "linear-gradient(135deg, #11998e, #38ef7d)",
              color: "white",
              zIndex: 99,
            }}
          />
          <div className="h-150  rounded-lg space-y-5">
            <div className=" space-y-8 flex flex-col gap-5">
              {lowestTasks.length === 0 && (
                <>
                  <Empty description="There is no task added as lowest priority" />
                  <button
                    className=" w-fit mx-auto focus:shadow-lg hover:scale-105 transition-all duration-200 items-center text-sm py-2 bg-gradient-to-tr from-blue-500 via-violet-500 to-blue-500 text-white font-medium px-3 rounded-sm"
                    onClick={() => setOpen(true)}
                  >
                    + Add task
                  </button>
                </>
              )}

              {lowestTasks.map((item, index) => (
                <Card key={index}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <label
                    htmlFor=""
                    className="text-slate-600 text-xs flex justify-end mt-1.5"
                  >
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                  <div className="mt-3 flex justify-between items-center">
                    <div className=" flex gap-1.5">
                      <Tag
                        className={`capitalize ${
                          item.status === "pending"
                            ? "!border-gray-400 !text-gray-500"
                            : item.status === "inProgress"
                            ? "!border-red-500 !text-red-500"
                            : item.status === "completed"
                            ? "!border-green-500 !text-green-500"
                            : ""
                        }`}
                      >
                        {item.status}
                      </Tag>
                      <Popconfirm
                        title="Do you want to delete this tasks ?"
                        onConfirm={()=>deleteTask(item.id)}
                      >
                        <Tag className="!bg-rose-600 !border-rose-600 !text-white !cursor-pointer">
                          Delete
                        </Tag>
                      </Popconfirm>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change Status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        In Progress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Model */}
      <Modal
        open={open}
        footer={null}
        onCancel={handleClose}
        maskClosable={false}
      >
        {/* Form */}
        <Form
          onFinish={createTask}
          form={form}
          initialValues={{ description: des }}
        >
          <h1 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h1>
          <Form.Item name={"title"} rules={[{ required: true }]}>
            <Input placeholder="Task Title Name" size="large" />
          </Form.Item>
          <Form.Item name={"description"} rules={[{ required: true }]}>
            <Input.TextArea
              placeholder="Task description goes here "
              size="large"
              rows={4}
            />
          </Form.Item>
          <Form.Item name={"priority"} rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose priority">
              <Select.Option value="highest">Highest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="lowest">Lowest</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" size="large">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskPlanner;
