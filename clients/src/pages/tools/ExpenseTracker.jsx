import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import {nanoid} from 'nanoid'
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import moment from "moment";
import { useExpense } from "../../store/useExpense";
const ExpenseTracker = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editId, setEditId]= useState(null)
  const { expenses, setExpense, deleteExpense, updateExpenses } = useExpense();

  const onClose = () => {
    setEditId(null)
    setOpen(false);
    form.resetFields();
  };

  const createExpense = (value) => {
    value.id = nanoid()
    value.date = moment(value.date).toDate();
    setExpense(value);
    form.resetFields();
    setOpen(false);
  };

  const saveExpense = (values)=>{
    values.date = moment(values.date).toDate()
    updateExpenses(editId, values)
    onClose()
  }

  const edit = (item)=>{
    setEditId(item.id)
    item.date = moment(item.date)
    setOpen(true)
    form.setFieldsValue(item)
  }

  return (
    <div className="min-h-screen w-full py-4 md:py-8 bg-gradient-to-br from-emerald-400 to-cyan-500">
      <div
        className="absolute top-2.5 lg:top-6 left-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="w-6 h-6" />
      </div>
      <div className="w-full md:w-9/12 mx-auto rounded-2xl bg-white p-4 sm:p-6 space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Expense Tracker
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              className="flex items-center justify-center gap-1 py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
              onClick={() => setOpen(true)}
            >
              <IoAdd /> Add new
            </button>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search these expenses"
                className="w-full py-2 pl-10 pr-4 rounded-xl border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-b-gray-400"></div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-emerald-500 to-cyan-500">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white hidden md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-white">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white hidden sm:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {expenses.length === 0 ? (
                <Empty />
              ) : (
                expenses.map((item, index) => (
                  <tr key={index} className="border-b last:border-b-2 border-gray-300 hover:bg-emerald-50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {item.title}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                      {item.description}
                    </td>

                    <td className="px-4 py-3 text-sm font-semibold text-right text-red-500 whitespace-nowrap">
                      ₹{item.amount}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell whitespace-nowrap">
                      {moment(item.date).format("DD MMM YYYY hh:mm A")}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                        onClick={()=>edit(item)}
                          className="p-1.5 rounded-md text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition"
                          title="Edit"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                        onClick={()=>deleteExpense(item.id)}
                          className="p-1.5 rounded-md text-red-500 hover:bg-red-50 hover:text-red-700 transition"
                          title="Delete"
                        >
                          <MdDeleteForever className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={5} className="px-4 py-3">
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div className="font-semibold text-gray-700">
                      Total Expense:
                      <span className="ml-2 text-red-500 text-lg">₹ {(expenses.reduce((sum, item)=>sum+ item.amount, 0)).toLocaleString()}</span>
                    </div>
                    <button
                      className="flex items-center gap-1 py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                      onClick={() => setOpen(true)}
                    >
                      <IoAdd /> Add Expense
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Modal open={open} footer={false} onCancel={onClose}>
        <h2 className="text-2xl font-medium text-center">Expense Details</h2>
        <Form layout="vertical" onFinish={editId ? saveExpense : createExpense} form={form}>
          {/* Title */}
          <Form.Item
            name={"title"}
            rules={[{ required: true }]}
            label="Expense Title"
          >
            <Input size="large" placeholder="Expense name here" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name={"description"}
            rules={[{ required: true }]}
            label="Description goes here..."
          >
            <Input.TextArea
              size="large"
              placeholder="Expense name here"
              rows={3}
            />
          </Form.Item>

          {/* Amount */}
          <Form.Item
            name={"amount"}
            rules={[{ required: true }]}
            label="Enter Amount"
          >
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              placeholder="Amount"
            />
          </Form.Item>

          {/* Date */}
          <Form.Item name={"date"} rules={[{ required: true }]} label="Date">
            <DatePicker
              style={{ width: "100%" }}
              size="large"
              placeholder="Date"
            />
          </Form.Item>

          {/* submit */}
          <Form.Item>
            {
              editId ? 
              <Button type="primary" size="large" htmlType="submit" danger>
              Save
            </Button>:
            <Button type="primary" size="large" htmlType="submit">
              Add Expense
            </Button>
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;
