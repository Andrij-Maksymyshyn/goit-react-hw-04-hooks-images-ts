import ImageGalleryItem from '../ImageGalleryItem';
import { BoxUl } from './ImageGallery.styled';

interface Iprops {
  propGallery: { [key: string]: string }[],
  onClick: (largeImg : string, tags: string) => void,
};

const ImageGallery = ({ propGallery, onClick }: Iprops ) => (
  <BoxUl>
    {propGallery.map(({ webformatURL, tags, largeImageURL }, index) => (
      <ImageGalleryItem
        key={index}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        onClick={onClick}
      />
    ))}
  </BoxUl>
);

export default ImageGallery;


