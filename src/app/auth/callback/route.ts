import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/src/config/constants";
import { ROUTES } from "@/src/config/routes";
import { NewUser } from "@/src/types/tables";
import { AUTH_METHODS } from "@/src/actions/auth/signup/actions";

/**
 * Handler function for processing the callback from the OAuth provider.
 *
 * @param {Request} request
 * @returns {NextResponse}
 */
export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const isSignup = requestUrl.searchParams.get("isSignup");
    const provider = requestUrl.searchParams.get("provider");

    if (code) {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      await supabase.auth.exchangeCodeForSession(code);

      if (isSignup === "true") {
        const user = await supabase.auth.getUser();
        const data = user.data.user!;

        const body: NewUser = {
          uuid: data.id,
          email: data.email!,
          authMethod: provider as AUTH_METHODS,
        };

        await supabase.from("Users").insert<NewUser>(body);
      }
    }
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${BASE_URL}${ROUTES.HOME}`);
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(`${BASE_URL}${ROUTES.HOME}`);
  }
}
