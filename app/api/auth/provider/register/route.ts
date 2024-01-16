import { HTTP_CODES } from "@config/constants";
import { API_ROUTES } from "@config/routes";
import { getError } from "@lib/error";
import { AuthService } from "@lib/services";
import { AUTH_METHODS } from "@lib/services/auth";
import { getClient } from "@lib/supabase";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler function for signing up a user with email and password.
 *
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function GET(req: NextRequest) {
  try {
    const client = getClient();
    const provider = req.nextUrl.searchParams.get("provider") as AUTH_METHODS;
    const code = req.nextUrl.searchParams.get("code");
    await AuthService.signUpWithProvider(provider!, code!, client);

    return NextResponse.json(
      { message: "Signed up successfully" },
      { status: HTTP_CODES.OK },
    );
  } catch (error) {
    return getError(error as Error, API_ROUTES.PROVIDER_SIGNUP);
  }
}
