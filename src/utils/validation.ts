import { z } from "zod/v4";

export const articleSchema = z.object({
  title: z
    .string("title should be string")
    .min(2, "title should be at least 2 char")
    .max(100),
  description: z.string().min(10).max(300),
});

export const UserSchema = z.object({
  email: z.string().min(5).email(),
  username: z.string().min(2).max(50),
  password: z.string().min(7),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

export const CreateCommentSchema = z.object({
  text: z.string().min(1),
  articleId: z.int(),
});

export const UpdateUserSchema = z.object({
  email: z.string().min(5).email().optional(),
  username: z.string().min(2).max(50).optional(),
  password: z.string().min(7).optional(),
});
