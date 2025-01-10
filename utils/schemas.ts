import { z, ZodSchema } from "zod";
import { AuthSchemaType } from "./types";

export function getAuthSchema(type: AuthSchemaType) {
  return z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    firstName:
      type === "sign-up"
        ? z.string().min(1, { message: "Please enter your first name" })
        : z.string().optional(),
    lastName:
      type === "sign-up"
        ? z.string().min(2, { message: "Please enter your last name" })
        : z.string().optional(),
  });
}

export const OTPSchema = z.object({
  pin: z.string().length(6, { message: "Please enter a valid OTP" }),
});

export const logoutSchema = z.object({});

export const renameFileSchema = z.object({
  name: z.string().min(1, { message: "File name must not be blank" }),
});

export const shareFileSchema = z.object({
  emails: z.string().min(1, { message: "Emails field cannot be blank" }),
});

export const removeSharedUserSchema = z.object({});

export const deleteFileSchema = z.object({});

export function validatedFieldsWithZod(schema: ZodSchema<any>, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
}
