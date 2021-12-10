export default function ContentLeftAuth({ children }) {
    return (
      <div className="min-h-screen antialiased bg-primary pt-10 md:pt-24 pb-5">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8 bg-primary">
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">{children}</div>
      </div>
      </div>
    );
  }
  