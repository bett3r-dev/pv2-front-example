function Navbar({ children, className, innerClassName, sticky=true}) {
  return (
    <nav className={`base-navbar ${className} ${sticky ? 'sticky top-0' : null}`}> {/** color & shadow */}
      <div className={`base-navbar-inner ${innerClassName}`}> {/** padding, margin, etc. */}
        <div className='flex items-center justify-between h-16 grid grid-cols-3 gap-4'>
          {children}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


