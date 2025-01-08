"use server";
import { envVariables } from "@/app/__constants/env-variables";
import { InviteUserSchemaType } from "@/app/__schema/auth/InviteUserSchema";
import { user as User } from "@/db/schemas/user";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: envVariables.smtpHost,
  port: envVariables.smtpPort || 465,
  secure: true,
  auth: {
    user: envVariables.smtpUser,
    pass: envVariables.smtpPass,
  },
});

type verifyMailType = {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
};

export const userVerificationMail = async (
  user: verifyMailType | typeof User.$inferSelect,
  token: string
) => {
  if (!user.isVerified)
    try {
      const mailOptions = {
        from: envVariables.smtpFrom,
        to: user.email,
        subject: `Verification Email | ${envVariables.appTitle}`,
        html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; text-align:center;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome ${user.name},</h2>
          <p>Thank you for registering. Please verify your email by clicking on the following link.</p>
          <div style="display: flex; justify-content: center; width:660px;"><a href=${envVariables.appUrl}/verify-email?token=${token} style="background: #22d3ee; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Click here to verify</a></div>`,
      };

      await transporter.sendMail(mailOptions);
      return { ok: true, message: "Verification Mail Sent" };
    } catch (err) {
      console.log("Verification Mail Error :", err);
      return { ok: false, message: "Sending Mail Failed" };
    }
};
export const passwordResetMail = async (
  user: verifyMailType | typeof User.$inferSelect,
  token: string
) => {
  try {
    const mailOptions = {
      from: envVariables.smtpFrom,
      to: user.email,
      subject: `Reset Password | ${envVariables.appTitle}`,
      html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; text-align:center;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome ${user.name},</h2>
          <p>Thank you for registering. Please verify your email by clicking on the following link.</p>
          <div style="display:flex;justify-content: space-around;text-align:center;width:660px;"><div><a href=${envVariables.appUrl}/reset-password?token=${token} style="background: #22d3ee; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Click here to verify</a></div></div>`,
    };

    const res = await transporter.sendMail(mailOptions);
    console.log("res:", res);
    return { ok: true, message: "Verification Mail Sent" };
  } catch (err) {
    console.log("Verification Mail Error :", err);
    return { ok: false, message: "Sending Mail Failed" };
  }
};
export const userInviteMail = async (
  user: InviteUserSchemaType,
  token: string
) => {
  try {
    const mailOptions = {
      from: envVariables.smtpFrom,
      to: user.email,
      subject: `Invitation from  ${envVariables.appTitle}`,
      html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; text-align:center;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome ${user.name},</h2>
          <p>You have been invited to join ${envVariables.appTitle}. Please verify your email by clicking on the following link.</p>
          <p>this link will expire in 24 hours.</p>
          <div style="display:flex;justify-content: space-around;text-align:center;width:660px;"><div><a href=${envVariables.appUrl}/sign-up/${token} style="background: #22d3ee; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Click here to verify</a></div></div>`,
    };

    const res = await transporter.sendMail(mailOptions);
    console.log("res:", res);
    return { ok: true, message: "Invitation Mail Sent" };
  } catch (err) {
    console.log("Verification Mail Error :", err);
    return { ok: false, message: "Sending Mail Failed" };
  }
};
