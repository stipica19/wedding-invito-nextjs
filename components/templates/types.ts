export type InvitationTemplateData = {
  title?: string;
  couple?: string;
  subtitle?: string;
  date?: string;
  time?: string;
  location?: string;
  hosts?: string;
  dressCode?: string;
  note?: string;
  selectedColor?: string;
};

export type InvitationTemplateProps = {
  data?: Record<string, unknown>;
  title?: string;
  date?: string;
  selectedColor?: string;
  mode?: "full" | "card";
};

// ─── Schema-driven form field definitions ────────────────────────────────────

export type TextFieldDef = {
  key: string;
  label: string;
  type: "text";
  required?: boolean;
  placeholder?: string;
};

export type TextareaFieldDef = {
  key: string;
  label: string;
  type: "textarea";
  required?: boolean;
  placeholder?: string;
  rows?: number;
};

export type CounterFieldDef = {
  key: string;
  label: string;
  type: "counter";
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
};

export type SelectFieldDef = {
  key: string;
  label: string;
  type: "select";
  options: { value: string; label: string }[];
  defaultValue?: string;
};

export type FieldDef =
  | TextFieldDef
  | TextareaFieldDef
  | CounterFieldDef
  | SelectFieldDef;
