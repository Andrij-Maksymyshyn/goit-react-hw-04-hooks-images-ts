import { useState, useEffect } from 'react';
import { fetchImages } from '../../fetchAPI/fetchAPI';
import { Toaster, toast } from 'react-hot-toast';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';
import { Container } from './App.styled';

const perPage = 12;


function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [images, setImages] = useState<{ [key: string]: string }[]>([]);
  const [page, setPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorM, setErrorM] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [largeImg, setlargeImg] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  const addSearchValue = (formData: string) => {
    setSearchValue(formData);
    setPage(1);
    setImages([]);
    setIsLoading(false);
    setErrorM(null);
  };

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setIsLoading(true);

    try {
      fetchImages(searchValue, page).then(data => {
        const {
          data: { hits, totalHits },
        } = data;

        if (hits.length === 0) {
          toast.error('Sorry, there are no pictures. Try another request...');
          return setImages([]);
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setEndPage(totalHits - page * perPage);
      });
    } catch (error) {
      setErrorM(error);
      toast.error('Whoops, something went wrong: error. Try new request');
      throw Error(errorM);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [searchValue, page, errorM]);

  const submitValue = (e: any) => {
    e.preventDefault();
    setSearchValue(e.currentTarget.elements.searchValue.value);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
    if (images.length > 0 && endPage < perPage) {
      return toast.error('Pictures are finished.Try new request');
    }
  };

  const toggleModal = (largeImg = '', tags = '') => {
    setShowModal(prevModal => !prevModal);
    setlargeImg(largeImg);
    setTags(tags);
  };

  const shouldRenderLoreMoreButton = endPage > perPage / 2 && images.length > 0;

  return (
    <Container>
      <Toaster position="top-right" />
      <Searchbar onSubmit={submitValue} propSubmit={addSearchValue} />
      {images.length > 0 && (
        <ImageGallery propGallery={images} onClick={toggleModal} />
      )}
      {isLoading && <Loader />}
      {shouldRenderLoreMoreButton && <Button buttonP={handleClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImg} alt={tags} />
        </Modal>
      )}
    </Container>
  );
}

export default App;
