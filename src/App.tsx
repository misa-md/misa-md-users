import * as React from "react";
import { useState } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import { Layout, Button } from "antd";
import NewUserIntro from "./NewUserIntro";
import IssueForm from "./IssueForm";
import LocaleContext, { switchLocale } from "./LocaleContext";
import styles from "./App.module.scss";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const locale = React.useContext(LocaleContext);
  const [localeString, forceUpdateLocale] = React.useState(locale);

  const appLocale = window.appLocale[localeString];
  addLocaleData(appLocale.data);

  const [issueType, setIssueType] = useState<string>();
  const onIssueTypeChanged = (type: string) => {
    setIssueType(type);
  };

  return (
    <LocaleContext.Provider>
      <Layout className="layout">
        <Header className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.logo}>
              <img
                alt="logo"
                src="https://misa-md.github.io/MDoc/img/logo.svg"
              />
              <h1>MISA-MD Issue Helper</h1>
            </div>
            <div className={styles.locale}>
              <Button
                size="small"
                onClick={() => switchLocale(forceUpdateLocale)}
              >
                {localeString === "en" ? "中文" : "English"}
              </Button>
            </div>
          </div>
        </Header>
        <IntlProvider locale={localeString} messages={appLocale.messages}>
          <Content className={styles.content}>
            {issueType === "new_user" ? <NewUserIntro /> : <> </>}
            <IssueForm onIssueTypeChanged={onIssueTypeChanged} />
          </Content>
        </IntlProvider>
        <Footer style={{ textAlign: "center" }}>
          Inspired by{" "}
          <a
            href="https://github.com/ant-design/antd-issue-helper"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ant Design Issue Helper
          </a>
          ·{" "}
          <a href="https://github.com/misa-md/misa-md-users">
            Source Code of This Page
          </a>
        </Footer>
      </Layout>
    </LocaleContext.Provider>
  );
};

export default App;
