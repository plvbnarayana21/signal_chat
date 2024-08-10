// import InitialModal from "@/components/modals/InitialModal";
import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import React from "react";

const setupPage = async () => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id, // Access id only if profile exists and has id
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  // return <div>create server</div>;
  return <InitialModal />;
};

export default setupPage;
