export enum AUTH_METHODS {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  TRADITIONAL = "traditional",
  X = "x",
}

export const enum ERROR_MESSAGES {
  ALREADY_REGISTERED = "User already registered",
  ALREADY_REGISTERED_POSTGRES = 'duplicate key value violates unique constraint "Users_pkey"',
  INVALID_LOGIN_CREDENTIALS = "Invalid login credentials",
}
export const enum ERROR_RESPONSES {
  ALREADY_REGISTERED = "A user with this email already exists.",
  UNKNOWN = "An unknown error occurred.",
  INVALID_LOGIN_CREDENTIALS = "Invalid email/password combination.",
  AUTH_REQUIRED = "You must be logged in to view this page.",
}
