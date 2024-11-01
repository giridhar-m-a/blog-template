"use server";
import { envVariables } from "@/app/__constants/env-variables";
import { User } from "@prisma/client";
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
  user: verifyMailType | User,
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
  user: verifyMailType | User,
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
