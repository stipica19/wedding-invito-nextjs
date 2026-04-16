import EleganceTemplate, { schema as eleganceSchema } from "./EleganceTemplate";
import LuxeTemplate, { schema as luxeSchema } from "./LuxeTemplate";
import WatercolorTemplate, { schema as watercolorSchema } from "./WatercolorTemplate";
import FloralTemplate, { schema as floralSchema } from "./FloralTemplate";
import type { FieldDef } from "./types";

export const templateRegistry = {
 
  elegance:   EleganceTemplate,
  luxe:       LuxeTemplate,
  watercolor: WatercolorTemplate,
  floral:     FloralTemplate,
} as const;

export const schemaRegistry: Record<string, FieldDef[]> = {
  elegance:   eleganceSchema,
  luxe:       luxeSchema,
  watercolor: watercolorSchema,
  floral:     floralSchema,
};

export type TemplateKey = keyof typeof templateRegistry;
