import { HTTP_CODES } from "@config/constants";
import { SERVER_ROUTES } from "@config/routes";
import { NextResponse } from "next/server";

export enum ERROR_MESSAGES_FORMATTED {
  EMAIL_AND_PASSWORD_REQUIRED = "Email and password are required",
  EMAIL_NOT_VERIFIED = "Please verify your email address before signing in.",
  INVALID_EMAIL_OR_PASSWORD = "Incorrect email/password combination.",
  INTERNAL_SERVER_ERROR = "An internal server error has occurred, please try again.",
}

export const getError = (error: Error, path: string) => {
  switch (path) {
    case SERVER_ROUTES.SIGNIN:
      switch (error.message) {
        case "Email and password are required":
          return NextResponse.json(
            {
              message: ERROR_MESSAGES_FORMATTED.EMAIL_AND_PASSWORD_REQUIRED,
            },
            {
              status: HTTP_CODES.BAD_REQUEST,
            },
          );
        case "Invalid login credentials":
          return NextResponse.json(
            {
              message: ERROR_MESSAGES_FORMATTED.INVALID_EMAIL_OR_PASSWORD,
            },
            { status: HTTP_CODES.UNAUTHORIZED },
          );
        case "Email not confirmed":
          return NextResponse.json(
            {
              message: ERROR_MESSAGES_FORMATTED.EMAIL_NOT_VERIFIED,
            },
            {
              status: HTTP_CODES.UNAUTHORIZED,
            },
          );
      }
    default:
      return NextResponse.json(
        {
          message: ERROR_MESSAGES_FORMATTED.INTERNAL_SERVER_ERROR,
        },
        {
          status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        },
      );
  }
};
