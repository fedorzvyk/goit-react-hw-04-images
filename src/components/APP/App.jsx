import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box } from '../Box';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Loader } from '../Loader/Loader';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from '../../api/api';
import { Notification } from './App.styled';

export function App() {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchName) {
      return;
    }
    setStatus('pending');
    getImages(searchName, page)
      .then(data => {
        // console.log(data);
        if (data.hits.length !== 0 && page === 1) {
          toast.success(`We find ${data.totalHits} images`);
        }
        setImages(images => {
          return page === 1
            ? [
                ...data.hits.map(
                  ({ webformatURL, largeImageURL, id, tags }) => {
                    return { id, webformatURL, largeImageURL, tags };
                  }
                ),
              ]
            : [
                ...images,
                ...data.hits.map(
                  ({ webformatURL, largeImageURL, id, tags }) => {
                    return { id, webformatURL, largeImageURL, tags };
                  }
                ),
              ];
        });
        setStatus('resolved');

        if (data.hits.length === 0) {
          toast.warn('Try again');
          throw new Error('Try again');
        } else if (data.hits.length < 12) {
          toast.warn('These are all images we can show!');
          throw new Error('These are all images we can show!');
        }
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
  }, [page, searchName]);

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };
  // console.log(images);

  const handleFormSubmit = newSearchName => {
    if (searchName !== newSearchName) {
      setSearchName(newSearchName);
      setPage(1);
      setImages([]);
    }
  };

  return (
    <Box display="grid" gridGap={5} gridTemplateColumns="1fr">
      <Searchbar onFormSubmit={handleFormSubmit} />
      {status === 'rejected' && images.length === 0 && (
        <Notification>Images not found. Please try again</Notification>
      )}
      {<ImageGallery images={images} />}

      {status === 'pending' && <Loader />}

      {images.length > 0 && status === 'resolved' && (
        <Button onLoadMore={handleLoadMore}>Load more</Button>
      )}
      <ToastContainer autoClose={3000} theme="dark" />
    </Box>
  );
}
