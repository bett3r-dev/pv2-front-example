function NavbarLink({label, className, ...rest}){
    return(
        <button className={`base-navbar-link ${className}`} {...rest}>
          {label}
        </button>
    )
}

export default NavbarLink;


           