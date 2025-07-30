import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must include at least one special character",
    }),
});
