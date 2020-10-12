import * as React from "react";
import { importMDX } from "mdx.macro";
import LocaleContext from "./LocaleContext";

const texts: any = {
  en: {
    newUserEmailHelp: importMDX.sync("./locales/en/newUserEmail.md"),
    newUserIntro: importMDX.sync("./locales/en/newUserIntro.md"),
    newUserApplyFiledHelp: importMDX.sync(
      "./locales/en/newUserApplyFiledHelp.md"
    ),
  },
  zh: {
    newUserEmailHelp: importMDX.sync("./locales/zh/newUserEmail.md"),
    newUserIntro: importMDX.sync("./locales/zh/newUserIntro.md"),
    newUserApplyFiledHelp: importMDX.sync(
      "./locales/zh/newUserApplyFiledHelp.md"
    ),
  },
};

export interface Props {
  id: string;
  [name: string]: any;
}

const I18n: React.FC<Props> = ({ id, ...restProps }) => {
  const locale = React.useContext(LocaleContext);
  const Text = texts[locale][id];

  return (
    <div {...restProps}>
      <Text />
    </div>
  );
};

export default I18n;
