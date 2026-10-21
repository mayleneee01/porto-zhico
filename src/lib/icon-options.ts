export const ICON_OPTIONS = [
  { value: 'Shield', label: 'Shield' },
  { value: 'ShieldAlert', label: 'Shield Alert' },
  { value: 'Target', label: 'Target' },
  { value: 'Crosshair', label: 'Crosshair' },
  { value: 'Bug', label: 'Bug' },
  { value: 'Network', label: 'Network' },
  { value: 'Terminal', label: 'Terminal' },
  { value: 'Code2', label: 'Code' },
  { value: 'Search', label: 'Search' },
  { value: 'FileSearch', label: 'File Search' },
  { value: 'Server', label: 'Server' },
  { value: 'Database', label: 'Database' },
  { value: 'Globe', label: 'Globe' },
  { value: 'LockKeyhole', label: 'Lock' },
  { value: 'Wrench', label: 'Wrench' },
  { value: 'Monitor', label: 'Monitor' },
  { value: 'Braces', label: 'Braces' },
] as const;

export const ICON_VALUES = new Set(ICON_OPTIONS.map((option) => option.value));

export function normalizeIcon(value: FormDataEntryValue | null): string | null {
  const icon = typeof value === 'string' ? value : '';
  return ICON_VALUES.has(icon as (typeof ICON_OPTIONS)[number]['value']) ? icon : null;
}
