import React from 'react'
import DateTime from '../../../lib/DateTime'
import { FaCheck, FaCheckDouble, FaEllipsisV } from 'react-icons/fa';

const ReadAtToolTip = (props) => {
    let { msg } = props;
    return (
        <div
            className="position-absolute translate-middle-x"
            style={{
                bottom: '60px',
                backgroundColor: '#1f2937', // dark bg
                color: 'white',
                fontSize: '13px',
                borderRadius: '8px',
                padding: '6px 10px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                zIndex: 10,
                maxWidth: '260px',
                whiteSpace: 'nowrap',
            }}
        >
            <div className="d-flex align-items-center gap-1">
                {msg.read_at ? (
                    <FaCheckDouble style={{ color: '#34B7F1', fontSize: '14px' }} />
                ) : (
                    <FaCheck style={{ fontSize: '14px' }} />
                )}
                <span>Read</span>
                {msg.read_at && (
                    <span className="ms-1">{DateTime.UTCtoLocalTimeAndMmmFormat(msg.read_at)}</span>
                )}
                {!msg.read_at && (
                    <FaEllipsisV className="text-muted ms-1" style={{ transform: 'rotate(90deg)' }} />
                )}
            </div>

            {/* Tooltip arrow */}
            <div
                className="position-absolute"
                style={{
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '8px solid #1f2937',
                }}
            ></div>
        </div>
    )
}

export default ReadAtToolTip
