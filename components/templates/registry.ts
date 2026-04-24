import EleganceTemplate, { schema as eleganceSchema } from "./EleganceTemplate";
import LuxeTemplate, { schema as luxeSchema } from "./LuxeTemplate";
import WatercolorTemplate, { schema as watercolorSchema } from "./WatercolorTemplate";
import FloralTemplate, { schema as floralSchema } from "./FloralTemplate";
import BotanicTemplate, { schema as botanicSchema } from "./BotanicTemplate";
import MonogramTemplate, { schema as monogramSchema } from "./MonogramTemplate";
import type { FieldDef } from "./types";
import ClassicFloralTemplate, { schema as classicFloralSchema } from "./ClassicFloralTemplate";
import GoldenLeafTemplate, { schema as goldenLeafSchema } from "./GoldenLeafTemplate";
import WhiteFloralTemplate, { schema as whiteFloralSchema } from "./WhiteFloralTemplate";


export const templateRegistry = {
  elegance:   EleganceTemplate,
  luxe:       LuxeTemplate,
  watercolor: WatercolorTemplate,
  floral:     FloralTemplate,
  botanic:    BotanicTemplate,
  monogram:   MonogramTemplate,
  classicFloral: ClassicFloralTemplate,
  goldenLeaf: GoldenLeafTemplate,
  whiteFloral: WhiteFloralTemplate,

} as const;

export const schemaRegistry: Record<string, FieldDef[]> = {
  elegance:   eleganceSchema,
  luxe:       luxeSchema,
  watercolor: watercolorSchema,
  floral:     floralSchema,
  botanic:    botanicSchema,
  monogram:   monogramSchema,
  classicFloral: classicFloralSchema,
  goldenLeaf: goldenLeafSchema,
  whiteFloral: whiteFloralSchema,
};

export type TemplateKey = keyof typeof templateRegistry;
