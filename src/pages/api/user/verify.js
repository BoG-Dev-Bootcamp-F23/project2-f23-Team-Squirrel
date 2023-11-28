import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/lib/auth";
import connectDB from "../../../../server/mongodb/index.js";
import User from "../../../../server/mongodb/models/User.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
      }
  await connectDB();
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && user.password === password) { //if email and password match
        // creates jwt token!
        const token = await new SignJWT({
          email: email,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("300s")
          .sign(getJwtSecretKey());
    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );
    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });
    return response;
  }
  return NextResponse.json({ success: false });
}
// import { SignJWT } from "jose";
// import { getJwtSecretKey } from "../../../lib/auth";
// import connectDB from "../../../../server/mongodb/index.js";
// import User from "../../../../server/mongodb/models/User.js";

// export const config = { //weird stuff to fix a next.js error
//   api: {
//     externalResolver: true,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     await connectDB();
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && user.password === password) { //if email and password match
//       // creates jwt token!
//       const token = await new SignJWT({
//         email: email,
//       })
//         .setProtectedHeader({ alg: "HS256" })
//         .setIssuedAt()
//         .setExpirationTime("300s")
//         .sign(getJwtSecretKey());

//       // defining cookie to place in browser
//       res.setHeader(
//         "Set-Cookie",
//         `token=${JSON.stringify({ // returns token signature, user id, and admim
//           token,
//           userId: user._id,
//           admin: user.admin,
//         })}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict;`
//       );

//       return res.status(200).json({ success: true });
//     } else {
//       return res.status(500).json({ error: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error("Error in verify API:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
