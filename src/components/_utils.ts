export interface DefaultProps {
  modifiers?: string[];
}

export function mapModifiers(baseClass: string, modifiers: string[]) {
  return [baseClass, ...modifiers].join(' ');
};
