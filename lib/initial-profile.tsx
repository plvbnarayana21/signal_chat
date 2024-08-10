import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db"; // Assuming this imports your database connection
import { ClerkProvider } from "@clerk/nextjs";

import { RedirectToSignIn } from "@clerk/nextjs";
// Function for handling redirection if not signed in
function redirectIfNotSignedIn() {
  return (
    <ClerkProvider>
      <RedirectToSignIn />
    </ClerkProvider>
  );
}

export const initialProfile = async (): Promise<{ id: string }> => {
  const user = await currentUser();

  if (!user) {
    return redirectIfNotSignedIn(); // Redirect if no user
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    // Create the profile if it doesn't exist
    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return newProfile;
  }

  return profile;
};
