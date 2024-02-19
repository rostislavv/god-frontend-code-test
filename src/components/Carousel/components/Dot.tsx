import { Block , useTheme } from "vcc-ui";

export const Dot = ({ isActive  }: {
  isActive: boolean;
}) => {
  const theme = useTheme();
  return <Block
    extend={{
      borderRadius: '100%',
      margin: '0 0.25rem',
      transition: '1s background-color ease-out',
      backgroundColor: isActive ? theme.color.foreground.primary : theme.color.ornament.border,
      width: '0.625rem',
      height: '0.625rem',
    }}
  />
}
