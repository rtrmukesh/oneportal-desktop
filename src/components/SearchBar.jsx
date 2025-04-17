import React from 'react'
import { FiX } from 'react-icons/fi';
import SideBarHeader from '../views/Message/components/SideBarHeader';

const SearchBar = (props) => {
    let { setSearchText, searchText } = props;


    const handleClearSearch = () => {
        setSearchText('');
    };

    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '8px',
            }}
        >
            <SideBarHeader />

            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 36px 10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                        backgroundColor: "#e2dede"
                    }}
                />
                {searchText && (
                    <button
                        onClick={handleClearSearch}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#999',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#000')}
                        onMouseLeave={(e) => (e.target.style.color = '#999')}
                    >
                        <FiX size={18} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchBar
