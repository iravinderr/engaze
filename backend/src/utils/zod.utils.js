import { z } from "zod";

const registrationSchema = z.object({
    name: z.string()
        .min(3, { message: "Full name must be at least 3 characters long." })
        .max(50, { message: "Full name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Full name can only contain letters and spaces." }),
        
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(50, { message: "Username cannot exceed 50 characters." })
        .regex(/^[a-zA-Z0-9_.]+$/, { message: "Username can only contain letters, numbers, '_' and '.'" }),

    email: z.string()
        .email({ message: "Invalid email format." })
        .min(3, { message: "Email must be at least 3 characters long." })
        .max(50, { message: "Email cannot exceed 50 characters." }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(50, { message: "Password cannot exceed 50 characters." })
        .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
        .regex(/\d/, { message: "Password must include at least one digit." })
        .regex(/[@$!%*?&]/, { message: "Password must include at least one special character (@$!%*?&)." }),
});

export const validateCredentials = (userInput) => {
    const result = registrationSchema.safeParse(userInput);
    return { zodValidated: result.success, zodError: result.error };
};
