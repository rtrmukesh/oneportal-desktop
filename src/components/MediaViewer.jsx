import { Modal } from 'reactstrap';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ReactPlayer from 'react-player'; // For video playback
import Lightbox from 'yet-another-react-lightbox';
import { FaYoutube } from 'react-icons/fa';

export const isVideoURL = (url) => {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
    const fileExtension = url && url.slice(url.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(fileExtension);
  };
  

const MediaViewer = ({ media_url }) => {
    const [openMedia, setOpenMedia] = useState(null);

   
    return (
        <div>
            {media_url && (
                <div className="message-media">
                {/* Check if the media is a video */}
                {isVideoURL(media_url) ? (
                  <FaYoutube size={90} color="black" onClick={() => setOpenMedia(media_url)} />
                ) : (
                  <img
                    src={media_url}
                    alt="media"
                    className="message-image"
                    onClick={() => setOpenMedia(media_url)}
                  />
                )}
              </div>
            )}

            {/* Show the lightbox for videos or images */}
            {openMedia && (
                <div className="lightbox-overlay">
                    <div className="lightbox-content">
                        {isVideoURL(media_url) ? (
                            <Modal
                                isOpen={true}
                                onRequestClose={() => {
                                    setOpenMedia(null);
                                }}
                                contentLabel="Video Modal"
                            >
                                <div className="modal-content p-0 message-media">
                                    <div className="d-flex justify-content-end">
                                        < MdClose
                                            className="cursor-pointer align-right fw-bold h3 mt-0 pt-0"
                                            onClick={() => {
                                                setOpenMedia(null);
                                            }}
                                        />
                                    </div>
                                    <ReactPlayer
                                        url={media_url}
                                        playing={true}
                                        controls={true}
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </Modal>
                        ) : (
                            <Lightbox
                                open={openMedia ? true : false}
                                close={() => setOpenMedia(null)}
                                slides={[{ src: media_url }]}
                                renderPrevNext={null}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaViewer;
