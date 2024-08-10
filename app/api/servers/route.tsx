// // import currentProfile from "@/lib/current-profile";
// // import { db } from "@/lib/db";
// // import { MemberRole } from "@prisma/client";
// // import { NextResponse } from "next/server";
// // import { v4 as uuidv4 } from "uuid";

// // export async function POST(req: Request) {
// //   try {
// //     const { name, imageUrl } = await req.json();
// //     const profile = await currentProfile();

// //     if (!profile) {
// //       // If the user is not authenticated, return a 401 Unauthorized response
// //       return new NextResponse("Unauthorized", { status: 401 });
// //     }

// //     const server = await db.server.create({
// //       data: {
// //         profileId: profile.id,
// //         name,
// //         imageUrl,
// //         inviteCode: uuidv4(),
// //         channels: {
// //           create: [
// //             {
// //               name: "general",
// //               profileId: profile.id,
// //             },
// //           ],
// //         },
// //         members: {
// //           create: [
// //             {
// //               profileId: profile.id,
// //               role: MemberRole.ADMIN,
// //             },
// //           ],
// //         },
// //       },
// //     });

// //     // Return the created server data
// //     return NextResponse.json(server);
// //   } catch (error) {
// //     console.log("[SERVER_POST]", error); // Log the error
// //     return new NextResponse("Internal Error", { status: 500 });
// //   }
// // }

// import currentProfile from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { MemberRole } from "@prisma/client";
// import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req: Request) {
//   try {
//     const { name, imageUrl } = await req.json();
//     const profile = await currentProfile(req);

//     if (!profile) {
//       // If the user is not authenticated, return a 401 Unauthorized response
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const server = await db.server.create({
//       data: {
//         profileId: profile.id,
//         name,
//         imageUrl,
//         inviteCode: uuidv4(),
//         channels: {
//           create: [
//             {
//               name: "general",
//               profileId: profile.id,
//             },
//           ],
//         },
//         members: {
//           create: [
//             {
//               profileId: profile.id,
//               role: MemberRole.ADMIN,
//             },
//           ],
//         },
//       },
//     });

//     // Return the created server data
//     return NextResponse.json(server);
//   } catch (error) {
//     console.log("[SERVER_POST]", error); // Log the error
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile(req);

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
