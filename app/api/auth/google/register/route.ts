import { HTTP_CODES } from "@config/constants";
import { API_ROUTES } from "@config/routes";
import { getError } from "@lib/error";
import { GoogleIntegration } from "@lib/intergations";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler function for signing up a user with Google.
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function POST(req: NextRequest) {
  try {
    await GoogleIntegration.signUpWithGoogle();

    return NextResponse.json(
      { message: "Signed up successfully" },
      { status: HTTP_CODES.OK },
    );
  } catch (error) {
    return getError(error as Error, API_ROUTES.GOOGLE_SIGNUP);
  }
}
