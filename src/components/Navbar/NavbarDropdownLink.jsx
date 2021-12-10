
export default function NavbarDropdownLink({label, description, onClick, linkClassName, labelClassName, descriptionClassName}) {
  return (
        <li className="py-2 px-1">
            <button onClick={onClick} className={`base-dropdown-link ${linkClassName}`}>
                <p className={`base-dropdown-link-label ${labelClassName}`}>
                     {label}
                </p>
                <p className={`base-dropdown-link-description ${descriptionClassName}`}>
                     {description}
                </p>
            </button>
        </li>
  );
}
