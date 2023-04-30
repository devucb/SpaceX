type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};
export interface PIcon {
  size: IconSizeProps['iconSizes'];
  name: string;
  color: string;
}

export const IconSizes = {
  small: 18,
  medium: 24,
  large: 28,
  extraLarge: 32,
};
