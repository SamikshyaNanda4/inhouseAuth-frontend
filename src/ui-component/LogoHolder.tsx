import React from "react";

type Props = {
  children: React.ReactNode;
};

const TopLeftSticky: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 z-50">
      {children}
    </div>
  );
};

export default TopLeftSticky;