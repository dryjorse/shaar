import { FC } from "react";
import { useTranslation } from "react-i18next";

const MainPage: FC = () => {
  const { t } = useTranslation();

  return <>{t("text")}</>;
};

export default MainPage;
