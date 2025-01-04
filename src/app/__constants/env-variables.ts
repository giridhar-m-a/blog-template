export const envVariables: envVariables = {
  authSecret: process.env.AUTH_SECRET,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinarySecret: process.env.CLOUDINARY_SECRET,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  authUrl: process.env.AUTH_URL,
  appUrl: process.env.AUTH_URL,
  smtpFrom: process.env.RESEND_FROM_MAIL,
  smtpHost: process.env.RESEND_SMTP,
  smtpPort: Number(process.env.RESEND_PORT),
  smtpUser: process.env.RESEND_USER,
  smtpPass: process.env.RESEND_PASSWORD,
  recepiantEmail: process.env.RECEPIANT_MAIL,
  appTitle: process.env.APP_TITLE,
};

type envVariables = {
  authSecret: string | undefined;
  cloudinaryName: string | undefined;
  cloudinarySecret: string | undefined;
  cloudinaryKey: string | undefined;
  authUrl: string | undefined;
  appUrl: string | undefined;
  smtpHost: string | undefined;
  smtpPort: number | undefined;
  smtpUser: string | undefined;
  smtpPass: string | undefined;
  smtpFrom: string | undefined;
  recepiantEmail: string | undefined;
  appTitle: string | undefined;
};
