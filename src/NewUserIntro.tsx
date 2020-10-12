import * as React from "react";
import I18n from "./I18n";
import styles from "./NewUserIntro.module.scss";

const Intro: React.FC = () => {
  const introRef = React.useRef<null | HTMLDivElement>(null);

  return (
    <div className={`${styles.intro} paragraph`} ref={introRef}>
      <I18n id="newUserIntro" />
    </div>
  );
};

export default Intro;
