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