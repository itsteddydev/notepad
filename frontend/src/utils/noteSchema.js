import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
  description: z.string().min(5, "La descripción debe tener al menos 5 caracteres."),
  date: z.string(),
});
