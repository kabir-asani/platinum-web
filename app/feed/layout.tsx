import React, { PropsWithChildren } from "react";
import { FeedNavigationBar } from "./components/navigation-bar/NavigationBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FeedSideBar } from "./components/side-bar/FeedSideBar";

const FeedLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <FeedNavigationBar />
      <SidebarProvider className="w-5xl mx-auto mt-4">
        <FeedSideBar />
        {children}
      </SidebarProvider>
    </main>
  );
};

export default FeedLayout;
