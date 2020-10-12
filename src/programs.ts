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
    users_repo: "misa-md/misa-md",
  },
  {
    name: "misa-md-hip",
    enabled: true,
    label: "misa-md-hip",
    display: "MISA-MD-hip (MISA-MD for GPU/DCU) (beta)",
    users_repo: "misa-md/potential-hip",
  },
  {
    name: "misa-md-sunway",
    enabled: true,
    label: "misa-md-sunway",
    display: "MISA-MD-sunway (MISA-MD for Sunway Taihulight)",
    users_repo: "misa-md/potential-sunway",
  },
];
