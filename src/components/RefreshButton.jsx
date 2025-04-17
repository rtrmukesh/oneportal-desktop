import React from "react";
import { FiRefreshCw } from "react-icons/fi";

const RefreshButton = (props) => {
    let { onRefresh, isLoading, color } = props;
    return (
        <button
            type="button"
            className={`btn ${color ? color :"btn-light"}`}
            onClick={onRefresh}
            title="Refresh"
            disabled={isLoading}
        >
            <FiRefreshCw
                size={18}
                className={isLoading ? "spin-refresh" : ""}
                style={{ transition: "transform 0.3s ease" }}
            />
        </button>
    );
};

export default RefreshButton;
