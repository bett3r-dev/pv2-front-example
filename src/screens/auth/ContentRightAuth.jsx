export default function ContentRightAuth({ children }) {
    return (
      <div className='grid grid-cols-5'>
        <div className='md:col-span-3 col-span-full w-full flex justify-center'>
          <div className='w-10/12 flex justify-center h-screen'>
            {children}
          </div>
        </div>
        <div className='col-span-2 bg-primary hidden md:block h-screen'>
          {/** Right Content*/}
        </div>
      </div>
    );
  }
  