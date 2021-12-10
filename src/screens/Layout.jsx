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
        <Navbar> 
        <NavbarLeft>
          <NavbarDropdown label={__('dropdown')}>
            <NavbarDropdownLink label={__('Inputs')} description={__('Textbox, TextArea, Selects, etc.')} onClick={()=> history.push('/demo/inputs')}/>
            <NavbarDropdownLink label={__('Buttons')} onClick={()=> history.push('/demo/buttons')} />
            <NavbarDropdownLink label={__('Info')} description={__('ProgressBars, Alerts, etc.')} onClick={()=> history.push('/demo/info')}/>
            <NavbarDropdownLink label={__('Misc')}/>
            <NavbarDropdownLink label={__('Sanity')}  onClick={()=> history.push('/demo/sanity')}/>
            <NavbarDropdownLink label={__('Everything')} onClick={()=> history.push('/demo')}/>
          </NavbarDropdown>
        </NavbarLeft>
        <NavbarCenter>
          <TextBox/>
          <NavbarLink label={__('Home')} onClick={()=> history.push('/')}/>
        </NavbarCenter>
        <NavbarRight>
          <Button label={__('Log In')}  onClick={()=> history.push('/auth')}/>
        </NavbarRight>
      </Navbar>
      <div className="container mx-auto px-4 py-4 ">
          {children}
      </div>
      </>
    )
}