import { useLocation } from "react-router-dom";
import useLanguage from "../../components/Language/useLanguage";

type Props = {};

const Title = (props: Props) => {
  const { storage } = useLanguage();
  const location = useLocation();
  const returnSelectedLanguage = (de: string, en: string) => {
    if (storage === "de") return de;
    return en;
  };
  return (
    <div>
      {location.pathname === "/" &&
        returnSelectedLanguage("Video Übersicht", "Videos")}
    </div>
  );
};

export default Title;
