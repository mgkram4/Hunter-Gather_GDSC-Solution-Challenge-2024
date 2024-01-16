import { HTTP_CODES } from "@config/constants";
import { AuthService } from "@lib/services";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  try {
    await AuthService.signUpWithEmail(data);
    res.status(HTTP_CODES.OK).json({ success: true });
  } catch (error) {
    res
      .status(HTTP_CODES.UNAUTHORIZED)
      .json({ success: false, message: error });
  }
}
