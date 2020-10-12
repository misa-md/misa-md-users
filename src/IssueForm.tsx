import * as React from "react";
import { Form, Row, Col, Select, Button, Radio, Alert } from "antd";
import { FormattedMessage } from "react-intl";
import { BugOutlined } from "@ant-design/icons";
import { state } from "reactive.macro";
import NewUsersForm from "./NewUsersForm";
import createPreview from "./createPreview";
import useVersions from "./hooks/useVersions";
import styles from "./IssueForm.module.scss";
import { Programs } from "./programs";

const { Option } = Select;

const params: any = window.location.search
  .slice(1)
  .split("&")
  .reduce((acc, param) => {
    const [key, value] = param.split("=");
    return { ...acc, [key]: value };
  }, {}); // tslint:disable-line

if (!params.repo) {
  params.repo = "misa-md";
}

const IssueForm: React.FC<{}> = () => {
  let reproModal = state(false);

  const [form] = Form.useForm();

  const getContent = (type: string) =>
    createPreview(type, form.getFieldsValue());

  const [content, setContent] = React.useState("");
  const [preview, setPreview] = React.useState(false);
  const triggerPreview = (newPreview: boolean) => {
    setContent(getContent(form.getFieldValue("type")));
    setPreview(newPreview);
  };

  const formRef = React.useRef<HTMLDivElement | null>(null);
  const { repoVersions, fetchVersions } = useVersions();

  const bindModalHandler = React.useCallback(() => {
    formRef.current!.addEventListener("click", (e: Event) => {
      if ((e.target as any).getAttribute("href") === "#repro-modal") {
        e.preventDefault();
        reproModal = true;
      }
    });
  }, []);

  // Load form data from localStorage
  const restoreValues = React.useCallback((omitFields: Array<string> = []) => {
    const cache = localStorage.getItem("form");
    if (cache) {
      const values = JSON.parse(cache);
      const keys = Object.keys(values);

      // Remove unless fields
      omitFields.forEach((key) => {
        delete values[key];
      });

      if (values.type) {
        form.setFieldsValue({
          type: values.type,
        });
      }

      // Next frame (IE 9 not support RAF)
      setTimeout(() => {
        // Remove useless value
        const currentValues = form.getFieldsValue();
        keys.forEach((key) => {
          if (!(key in currentValues)) {
            delete values[key];
          }
        });

        form.setFieldsValue(values);
      }, 100);
    }
  }, []);

  const handleRepoChange = React.useCallback((repo: string) => {
    form.resetFields(["version"]);
    if (!repoVersions[repo]) {
      fetchVersions(repo);
    }
  }, []);

  const handleTypeChange = React.useCallback(() => {
    restoreValues(["type"]);
  }, []);

  const handleCreate = React.useCallback(() => {
    const issueType = form.getFieldValue("type");
    const repo = form.getFieldValue("repo");
    const title = encodeURIComponent(form.getFieldValue("title")).replace(
      /%2B/gi,
      "+"
    );
    const content = getContent(issueType);
    const withConfirm = `
- [ ] I have searched the [issues](https://github.com/misa-md/${repo}/issues) \
of this repository and believe that this is not a duplicate.

${content}
`;
    const withMarker = `${withConfirm}\n\n<!-- generated by misa-md-issue-helper. DO NOT REMOVE -->`;
    const body = encodeURIComponent(withMarker).replace(/%2B/gi, "+");
    const label =
      issueType === "feature" ? "&labels=💡%20Feature%20Request" : "";

    localStorage.clear();

    window.open(
      `https://github.com/${repo}/issues/new?title=${title}&body=${body}${label}`
    );
  }, []);

  React.useEffect(() => {
    fetchVersions("misa-md/misa-md"); // todo: (params.repo);
    bindModalHandler();
    restoreValues();
  }, []);

  const repo = form.getFieldValue("repo");
  const versions = repoVersions[repo] || [];

  return (
    <div ref={formRef}>
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={{
          repo: params.repo,
          type: "bug",
          version: versions[0],
        }}
        onFinish={() => {
          triggerPreview(true);
        }}
        onValuesChange={(_, values) => {
          let preForm = {};
          try {
            preForm = JSON.parse(localStorage.getItem("form") as string) || {};
          } catch (err) {
            // Do nothing
          }
          const cacheForm: any = {
            ...preForm,
          };
          Object.keys(values).forEach((key) => {
            if (values[key]) {
              cacheForm[key] = values[key];
            }
          });
          localStorage.setItem("form", JSON.stringify(cacheForm, null, 2));
        }}
      >
        <Row>
          <Col span={11}>
            <Form.Item
              name="repo"
              label={
                <FormattedMessage
                  id="issue.program"
                  defaultMessage="I am opening an issue for"
                />
              }
              help={
                <FormattedMessage
                  id="issue.repoHelp"
                  defaultMessage="Please make sure to file the issue at appropriate repo."
                />
              }
            >
              <Select onChange={handleRepoChange}>
                {Programs.map((meta) => {
                  return (
                    <Option value={meta.users_repo}>{meta.display}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item
              name="type"
              label={
                <FormattedMessage id="issue.type" defaultMessage="This is a" />
              }
            >
              <Radio.Group
                onChange={handleTypeChange}
                className={styles.radioGroup}
              >
                <Radio.Button value="bug" disabled>
                  <FormattedMessage
                    id="issue.type.bug"
                    defaultMessage="Bug Report"
                  />
                </Radio.Button>
                <Radio.Button value="feature" disabled>
                  <FormattedMessage
                    id="issue.type.feature"
                    defaultMessage="Feature Request"
                  />
                </Radio.Button>
                <Radio.Button value="new_user">
                  <FormattedMessage
                    id="issue.type.new_user"
                    defaultMessage="New User"
                  />
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          noStyle
          shouldUpdate={(prev, next) => prev.type !== next.type}
        >
          {() =>
            form.getFieldValue("type") === "feature" ? (
              <Alert message="Under development" type="warning" showIcon />
            ) : form.getFieldValue("type") === "bug" ? (
              <Alert message="Under development" type="warning" showIcon />
            ) : (
              <NewUsersForm />
            )
          }
        </Form.Item>
        <Form.Item>
          <div className={styles.submitBtn}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<BugOutlined />}
            >
              <FormattedMessage id="issue.preview" defaultMessage="Preview" />
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default IssueForm;