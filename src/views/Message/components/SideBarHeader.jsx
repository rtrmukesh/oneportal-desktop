import React from 'react';
import { FiPlus } from 'react-icons/fi';
import RefreshButton from '../../../components/RefreshButton';
import { useAppContext } from '../../../context/AppContext';

const SideBarHeader = (props) => {
  const { onRefresh, isLoading } = useAppContext();

  return (
    <div
      className="d-flex justify-content-end align-items-center px-0 py-2 gap-2"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 11,
      }}
    >
      <RefreshButton
        onRefresh={()=>onRefresh(true)}
        isLoading={isLoading}
      />
      <button
        className="btn btn-sm custom-outline-primary d-flex align-items-center"
        title="Add New"
      >
        <FiPlus size={26} />
      </button>
    </div>
  );
};

export default SideBarHeader;
