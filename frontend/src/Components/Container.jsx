import React, { Children } from "react";

function Container({ children }) {
  return <div className="max-w-[1200px] mx-auto w-full">{children}</div>;
}

export default Container;
