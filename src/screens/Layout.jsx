import { useHistory } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";

export default function Layout({children}){
  let history = useHistory();
  const {__} = useTranslation();
    return(
      <>
      <div className="container mx-auto px-4 py-4 ">
          {children}
      </div>
      </>
    )
}