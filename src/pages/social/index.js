import { Form,Input } from "antd";

const Social = ({ form, handleNextStep }) => {

  return (
    <div className="main_form_div">
      <h3 style={{ textAlign: "center" }}>
        Add social links like linkedin , github etc
      </h3>
      <Form form={form} onFinish={handleNextStep}>

        <Form.Item
          name={`github`}
          rules={[
            {
              required: true,
              message: "Please enter the link to the social platform!",
            },
          ]}
        >
          <Input
            className="form_item_input"
            placeholder="Github Links *"
          ></Input>
        </Form.Item>
        <Form.Item
          name={`linkedin`}
          rules={[
            {
              required: true,
              message: "Please enter the link to the social platform!",
            },
          ]}
        >
          <Input
            className="form_item_input"
            placeholder="Linkdin Links *"
          ></Input>
        </Form.Item>
        <Form.Item
          name={`facebook`}
          rules={[
            {
              required: true,
              message: "Please enter the link to the social platform!",
            },
          ]}
        >
          <Input
            className="form_item_input"
            placeholder="Facebook Links *"
          ></Input>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Social;
