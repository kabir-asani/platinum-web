import React, { PropsWithChildren } from "react";
import { NavigationBar } from "./components/navigation-bar/NavigationBar";

const FeedLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <NavigationBar />
      {children}
    </main>
  );
};

export default FeedLayout;
