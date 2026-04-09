import ClassicTemplate from "./ClassicTemplate";
import GardenTemplate from "./GardenTemplate";
import ModernTemplate from "./ModernTemplate";

export const templateRegistry = {
  classic: ClassicTemplate,
  garden: GardenTemplate,
  modern: ModernTemplate,
} as const;

export type TemplateKey = keyof typeof templateRegistry;