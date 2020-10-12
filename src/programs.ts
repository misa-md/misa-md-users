interface ProgramMeta {
  name: string;
  enabled: boolean;
  label: string;
  display: string;
  users_repo: string;
}
export const Programs: Array<ProgramMeta> = [
  {
    name: "misa-md",
    enabled: true,
    label: "misa-md",
    display: "MISA-MD",
    users_repo: "misa-md/misa-md-users",
  },
];
