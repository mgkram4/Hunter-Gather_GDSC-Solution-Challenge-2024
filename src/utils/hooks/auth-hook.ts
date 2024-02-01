import { ROUTES } from "@/src/config/routes";
import { ERROR_RESPONSES } from "../helpers/auth/enums";
import { createClient } from "../supabase/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Hook to check if the user is authenticated.
 *
 * @param {AppRouterInstance} router
 * @returns
 */
export const useAuth = async (router: AppRouterInstance) => {
  const supabase = createClient();
  const { error, data } = await supabase.auth.getUser();
  const hasError = error || !data;

  if (hasError) {
    router.push(`${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`);
  }
  return data;
};
