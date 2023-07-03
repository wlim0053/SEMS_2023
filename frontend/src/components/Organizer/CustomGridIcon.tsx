import { Icon, IconProps } from '@chakra-ui/react';

function CustomGridIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <rect x="1" y="1" width="6" height="6" fill="currentColor" />
      <rect x="8" y="1" width="6" height="6" fill="currentColor" />
      <rect x="15" y="1" width="6" height="6" fill="currentColor" />
      <rect x="1" y="8" width="6" height="6" fill="currentColor" />
      <rect x="8" y="8" width="6" height="6" fill="currentColor" />
      <rect x="15" y="8" width="6" height="6" fill="currentColor" />
      <rect x="1" y="15" width="6" height="6" fill="currentColor" />
      <rect x="8" y="15" width="6" height="6" fill="currentColor" />
      <rect x="15" y="15" width="6" height="6" fill="currentColor" />
    </Icon>
  );
}

export default CustomGridIcon;
