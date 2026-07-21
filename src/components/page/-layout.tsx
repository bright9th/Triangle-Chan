// import { ThemeSwitcher } from "../common/theme";
// import ViteIcon from "/assets/vite.svg";

const Layout = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div
        className="animate-spin
          w-0 h-0
          border-l-[96px] border-r-[96px] border-b-[168px]
          border-l-transparent border-r-transparent border-b-[#FF0000]"
      />
    </div>
  );
};

export default Layout;
