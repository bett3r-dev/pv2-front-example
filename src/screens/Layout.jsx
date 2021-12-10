import { useHistory } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import Button from "../components/common/Button";
import Navbar from "../components/Navbar/Navbar";
import NavbarDropdown from "../components/Navbar/NavbarDropdown";
import NavbarDropdownLink from "../components/Navbar/NavbarDropdownLink";
import NavbarLeft from "../components/Navbar/NavbarLeft";
import NavbarRight from "../components/Navbar/NavbarRight";
import NavbarCenter from "../components/Navbar/NavbarCenter";
import NavbarLink from "../components/Navbar/NavbarLink";
import TextBox from "../components/common/TextBox";


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