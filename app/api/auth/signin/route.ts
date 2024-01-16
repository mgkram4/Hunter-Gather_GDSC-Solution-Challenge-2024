import { HTTP_CODES } from "@config/constants";
import { CLIENT_ROUTES, API_ROUTES } from "@config/routes";
import { getError } from "@lib/error";
import { AuthService } from "@lib/services";
import { getClient } from "@lib/supabase";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler function for signing in a user with email and password.
 *
 * @param {NextRequest} req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const client = getClient();
    const body = await req.json();

    await AuthService.signInWithEmail(body, client);

    return NextResponse.json(
      { message: "Signed in successfully" },
      { status: HTTP_CODES.OK },
    );
  } catch (error) {
    return getError(error as Error, API_ROUTES.SIGNIN);
  }
}
