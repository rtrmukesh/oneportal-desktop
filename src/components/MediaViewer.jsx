import React, { useState, useRef } from 'react';
import { Modal } from 'reactstrap';
import { MdClose } from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import ArrayList from '../lib/ArrayList';
import useIntersectionObserver from '../lib/Media';

export const isVideoURL = (url) => {
  const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
  const fileExtension = url && url.slice(url.lastIndexOf('.')).toLowerCase();
  return videoExtensions.includes(fileExtension);
};

const MediaViewer = ({ media_url }) => {
  const [openMedia, setOpenMedia] = useState(null);

  const mediaList = ArrayList.isArray(media_url) ? media_url : media_url ? media_url.split(",") : [];

  return (
    <div className="media-gallery d-flex gap-3 flex-wrap">
      {mediaList.map((url, index) => {
        const imgRef = useRef(null);
        const isVisible = useIntersectionObserver(imgRef, true); // you can disable for modal too

        return (
          <div key={index} className="media-item">
            {isVideoURL(url) ? (
              <FaYoutube
                size={90}
                color="black"
                onClick={() => setOpenMedia({ type: 'video', url })}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <img
                ref={imgRef}
                src={isVisible ? url : ''}
                alt="media"
                className="message-image"
                onClick={() => setOpenMedia({ type: 'image', url })}
                style={{ width: 100, height: 100, objectFit: 'cover', cursor: 'pointer', background: '#e0e0e0' }}
              />
            )}
          </div>
        );
      })}

      {openMedia?.type === 'video' && (
        <Modal isOpen={true} toggle={() => setOpenMedia(null)}>
          <div className="modal-content p-0 message-media">
            <div className="d-flex justify-content-end">
              <MdClose
                className="cursor-pointer fw-bold h3"
                onClick={() => setOpenMedia(null)}
              />
            </div>
            <ReactPlayer
              url={openMedia.url}
              playing={true}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        </Modal>
      )}

      {openMedia?.type === 'image' && (
        <Lightbox
          open={true}
          close={() => setOpenMedia(null)}
          slides={mediaList
            .filter((url) => !isVideoURL(url))
            .map((url) => ({ src: url }))}
          index={mediaList.filter((url) => !isVideoURL(url)).findIndex((i) => i === openMedia.url)}
        />
      )}
    </div>
  );
};

export default MediaViewer;
