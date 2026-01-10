import React, { useRef, useState } from "react";
import { Button, Form, Input, Modal, QRCode } from "antd";
import { FaDownload } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


const QrCodeGenerator = () => {
    const [form] = Form.useForm()
    const divRef = useRef(null)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [icon, setIcon] = useState('')


    const [qr, setQr] =useState({
        value: 'https://tools-ifkl.onrender.com',
        bgColor: 'white',
        color:'black',
        icon:''
    })

    

    const downloadNow = ()=>{
        const div = divRef.current
        const canvas = div.querySelector("canvas")
        const base =canvas.toDataURL('img/png')
        const a = document.createElement("a")
        a.href = base
        a.download = "qr-code.png"
        a.click()
        a.remove()
    }

    const chooseFile = (e)=>{
        const file =e.target.files[0]
        const url = URL.createObjectURL(file)
        setIcon(url)
    }

    const generateQR = (value)=>{
        value.bgColor = value.bgColor || "white"
        value.color = value.color || "black"
        value.icon = icon
        setOpen(false)
        setQr((prev)=>({
            ...prev,
            ...value
        }))

    }

    const onClose = ()=>{
        setOpen(false)
        form.resetFields()
        setIcon('')
    }

  return (
    <div className="bg-gray-200 h-screen py-10 flex flex-col items-center gap-5 justify-center">
         <div
                className="absolute top-2.5 lg:top-6 left-5 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <IoArrowBack className="w-6 h-6" />
              </div>
      <h1 className="text-3xl sm:text-4xl font-bold ">Generate - QR Code </h1>
      <div ref={divRef} className=" rounded-xl p-3 bg-white shadow-lg w-fit hover:scale-105 transition-all duration-200 hover:shadow-xl">
        <QRCode
          value={qr.value}
          size={300}
          icon={qr.icon}
          bgColor={qr.bgColor}
          color={qr.color}
        />
      </div>
      <div className="flex gap-4">
        <Button
          size="large"
          type="primary"
          style={{
            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            border: "none",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 8px 20px rgba(0,114,255,0.4)",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,114,255,0.3)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,114,255,0.4)";
          }}
          onClick={()=>setOpen(true)}
        >
          Generate new QR
        </Button>
        <Button
          size="large"
          type="primary"
          style={{
            background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
            border: "none",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 8px 20px rgba(0,114,255,0.4)",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,114,255,0.3)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,114,255,0.4)";
          }}
          icon={<FaDownload />}
          onClick={downloadNow}
        >
          Download now
        </Button>
      </div>

      <Modal open={open} footer={null} onCancel={onClose}>
          <h1 className="text-lg font-medium mb-4">Generate your QR</h1>
          <Form onFinish={generateQR} form={form}>
            <Form.Item 
            label="URL"
            rules={[{required:true, type: "url"}]}
            name={"url"}
            >
                <Input
                size="large"
                placeholder="https://domin.com"
                />
            </Form.Item>

            <Form.Item 
            label="BG Color"
            name={"bgColor"}
            >
                <Input
                type={"color"}
                size="large"
                />
            </Form.Item>

            <Form.Item 
            label="Color"
            name={"color"}
            >
                <Input
                type={"color"}
                size="large"
                />
            </Form.Item>

            <Form.Item 
            label="Logo"
            name={"logo"}
            >
                <Input
                type={"file"}
                size="large"
                accept="image/*"
                onChange={chooseFile}
                />
            </Form.Item>

            <Form.Item>
                <Button size="large" type="primary" htmlType="submit">Generate</Button>
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};

export default QrCodeGenerator;
