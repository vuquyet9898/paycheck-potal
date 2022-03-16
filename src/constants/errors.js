export const ERROR_TYPES = {
  AUTH: 'auth',
  COMMON: 'common',
}

export const ERRORS = {
  auth: {
    Signin: 'Try signing with a different account.',
    OAuthSignin: 'Try signing with a different account.',
    OAuthCallback: 'Try signing with a different account.',
    OAuthCreateAccount: 'Try signing with a different account.',
    EmailCreateAccount: 'Try signing with a different account.',
    Callback: 'Try signing with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin: 'Your ID or password is incorrect. Please try again',
    default: 'Unable to sign in.',
  },
  common: 'Common error, please try again',
}
