import { Form, Input, Upload, Button} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "./index.css"
// const props = {
//   name: "file",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

const Profile = ({form,handleNextStep}) => {
  return (
    <div className="main_form_div">
      <h3 style={{textAlign:"center"}}>Add your profile details</h3>
      <Form form={form}
       className="form"
       onFinish={handleNextStep}
       >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="form_item"
        >
          <Input type="firstName" placeholder="First Name"  className="form_item_input"/>
        </Form.Item>
        <Form.Item
          className="form_item"

          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input type="lastName" placeholder="Last Name"  className="form_item_input" />
        </Form.Item>
        <Form.Item
          className="form_item"
          
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input type="phoneNumber" placeholder="Phone Number"  className="form_item_input" />
        </Form.Item>
        <Form.Item
          className="form_item"

          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input type="address" placeholder="Address"  className="form_item_input"/>
        </Form.Item>
        <Form.Item
          className="form_item"
         style={{border:"1px solid rgba(0, 0, 0, 0.2)", padding:"13.5px 14px",borderRadius:5}}
          name="imageUrl"
          rules={[
            {
              required: true,
              message: "Please upload your image!",
            },
          ]}
        >
        <Upload 
          fileList={[
            {
              uid:"file",
              name:`file name`,
              status:"done",
              url:"link"
            }
          ]}>
            <Button icon={<UploadOutlined />}>Choose File</Button>
            <span>No file choosen</span>
          </Upload>
          </Form.Item>
      </Form>
   
    </div>
  );
};

export default Profile;
