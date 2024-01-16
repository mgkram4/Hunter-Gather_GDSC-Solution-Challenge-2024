import { HTTP_CODES } from "@config/constants";
import { API_ROUTES } from "@config/routes";
import { getError } from "@lib/error";
import { AuthService } from "@lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await AuthService.signUpWithEmail(body);

    return NextResponse.json(
      { message: "Signed up successfully" },
      { status: HTTP_CODES.OK },
    );
  } catch (error) {
    return getError(error as Error, API_ROUTES.SIGNUP);
  }
}
