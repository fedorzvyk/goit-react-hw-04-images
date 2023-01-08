import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, ItemImage, ModalImg } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GalleryItem>
        <ItemImage
          onClick={() => setIsModalOpen(isOpen => !isOpen)}
          src={webformatURL}
          alt={tags}
        />
      </GalleryItem>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(isOpen => !isOpen)}>
          <ModalImg src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
