import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-full bg-amber-100 ">
        <div className="w-96 bg-white shadow-md">
          <Outlet />
        </div>
      </div>
    </>
  );
};
