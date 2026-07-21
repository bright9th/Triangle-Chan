import { useState } from "react";

const Layout = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center">
      <h1 className="mt-8 text-black text-5xl font-bold select-none">
        {count}
      </h1>

      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="cursor-pointer active:scale-95 transition-transform"
          aria-label="Triangle"
        >
          <div
            className="animate-spin w-0 h-0
              border-l-[64px] border-r-[64px] border-b-[110px]
              border-l-transparent border-r-transparent border-b-[#FF0000]"
            style={{
              animationDuration: "8s",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Layout;
