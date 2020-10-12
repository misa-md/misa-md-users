import * as React from "react";
import { Form, Input } from "antd";
import { FormattedMessage } from "react-intl";
import I18n from "./I18n";

const FormItem = Form.Item;
const { TextArea } = Input;

const FeatureForm: React.FC<{}> = () => (
  <div>
    <Form.Item
      name="new_user_title"
      label={<FormattedMessage id="issue.title" defaultMessage="title" />}
      rules={[{ required: true }]}
      initialValue={"New User"}
    >
      <Input disabled />
    </Form.Item>
    <Form.Item
      name="new_user_name"
      label={
        <FormattedMessage
          id="issue.new_user.name_or_orcid"
          defaultMessage="Your preferred name or ORCID"
        />
      }
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="new_user_email"
      label={
        <FormattedMessage
          id="issue.new_user.contact_email"
          defaultMessage="Your contact email"
        />
      }
      help={<I18n id="newUserEmailHelp" />}
      rules={[
        {
          required: true,
          type: "email",
          message: "The input is not valid E-mail!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="new_user_org"
      label={
        <FormattedMessage
          id="issue.new_user.org"
          defaultMessage="Your institutions/organizations"
        />
      }
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="new_user_areas_of_interest"
      label={
        <FormattedMessage
          id="issue.new_user.areas_of_interest"
          defaultMessage="Your areas of interest or expertise"
        />
      }
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
    <FormItem
      name="new_user_apply_field"
      rules={[{ required: true }]}
      help={<I18n id="newUserApplyFiledHelp" />}
      label={
        <FormattedMessage
          id="issue.new_user.apply_field"
          defaultMessage="Which filed(s) will you apply this program to ?"
        />
      }
    >
      <TextArea autoSize={{ minRows: 2 }} />
    </FormItem>
  </div>
);

export default FeatureForm;
