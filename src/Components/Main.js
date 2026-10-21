import React, { Component } from 'react';
import { render } from 'react-dom';


import MultiPage from "./MultiPage";
import PrintButton from "./PrintButton";

const Main = () => {
    return (
        <div>
            <PrintButton id={"multiPage"} label={"Print multiplate pages"} />
            <MultiPage id={"multiPage"} />
        </div>
    )
};


export default Main;