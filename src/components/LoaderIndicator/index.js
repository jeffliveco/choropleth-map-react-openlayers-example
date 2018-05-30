import React from "react";
import Style from "./loader-indicator.scss"

class LoaderIndicator extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
          <div className="loader">
            <div className="lds-css ng-scope">
                <div className="lds-double-ring"><div></div><div></div></div>
            </div>
          </div>
        );
    }
}

export default LoaderIndicator;