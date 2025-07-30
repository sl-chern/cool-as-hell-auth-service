import z from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(6),
  password: z
    .string()
    .min(8)
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must include at least one special character",
    }),
});
