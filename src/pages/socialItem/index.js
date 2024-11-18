import { Form, Input } from "antd";
const SocialItem = ({i}) => {
  return (
    <Form.Item
      name={`social${i}`}
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
