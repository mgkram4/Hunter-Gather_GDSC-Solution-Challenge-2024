import { AuthService } from "@lib/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  try {
    await AuthService.signInWithEmail(data);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}
