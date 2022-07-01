import { Button } from './IconButton.styled';

interface IProps {
  onClick?: () => void,
  children?: React.ReactNode,
  'aria-label': string,
};

const IconButton = ({ children = null, onClick = () => null, ...allyProps }: IProps) => (
  <Button type="submit" onclick={onClick} {...allyProps}>
    {children}
  </Button>
);


export default IconButton;
