import { Li, Img } from './ImageGalleryItem.styled';

interface IProps {
  webformatURL: string,
  tags: string,
  largeImageURL: string,
  onClick: (largeImg : string, tags: string) => void,
};

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }: IProps) => (
  <Li
    onClick={() => {
      onClick(largeImageURL, tags);
    }}
  >
    <Img src={webformatURL} alt={tags} />
  </Li>
);

export default ImageGalleryItem;

