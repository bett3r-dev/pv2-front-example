export default function FormTitle({label, titleClassName, lineClassName}) {
  return (
    <div className={`base-form-title-line ${lineClassName}`}>
      <div className='flex w-11/12 xl:w-full xl:mx-0 items-center'>
        <p className={`base-form-title ${titleClassName}`}>
          {label}
        </p>
      </div>
    </div>
  );
}
