"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import React from "react";
import { CreatePost } from "../create-post/CreatePost";

export const FeedSideBar = () => {
  const { data } = betterAuthClient.useSession();
  const user = data?.user;

  return (
    <Sidebar collapsible="none" variant="floating" className="rounded-md border">
      {user && (
        <SidebarHeader>
          <div className="flex flex-row items-center justify-start gap-2">
            <Avatar className="h-8 w-8 rounded-lg">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : (
                <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
              )}
            </Avatar>
            <span>{user.name}</span>
          </div>
        </SidebarHeader>
      )}
      <SidebarGroup>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem className="w-64">
              <CreatePost />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </SidebarGroup>
    </Sidebar>
  );
};
