import { Form, Input } from "antd";
const SocialItem = () => {
  return (
    <Form.Item
      name="social"
      rules={[
        {
          required: true,
          message: "Please enter the link to the social platform!",
        },
      ]}
    >
      <Input className="form_item_input" placeholder="Social Links *"></Input>
    </Form.Item>
  );
};
export default SocialItem;
