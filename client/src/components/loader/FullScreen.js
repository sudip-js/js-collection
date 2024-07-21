import React from 'react';
import LogoImg from "../../assets/images/logo.svg"

const FullScreenLoader = () => {
    return (
        <div className="fullscreen-loader">
            <img src={LogoImg} alt="Loading..." className="loader-logo" />
        </div>
    );
};

export default FullScreenLoader;


