"use client";

import { Button } from "@/components/ui/button";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import React from "react";
import { CreatePost } from "./components/create-post/CreatePost";

const FeedPage = () => {
  const router = useRouter();

  return (
    <div className="h-svh w-svw flex flex-col items-center justify-center gap-4">
      <Button
        onClick={async () => {
          const { error } = await betterAuthClient.signOut();

          if (error) {
            return;
          }

          router.replace("/");
        }}
      >
        Log Out
      </Button>
      <CreatePost />
    </div>
  );
};

export default FeedPage;
