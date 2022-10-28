import { Outlet } from "react-router-dom";

// wrapper for Protected routes 

const InnerContent = () => {
  return (
    <div className="inner-content">
      <Outlet />
    </div>
  );
};

export default InnerContent;
