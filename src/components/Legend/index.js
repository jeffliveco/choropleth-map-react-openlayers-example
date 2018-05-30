import React from "react";
import Style from "./legend.scss";

class Legend extends React.Component {
    constructor(props){
        super(props);
    }

    renderLegendBox(color, text){
        let boxStyle = {
            backgroundColor: color
        };

        return(
            <div className="legend" style={boxStyle}>
                <span>[{text}]</span>
            </div>
        );
    }

    render() {
        return (
            <div className="cnt-legend">
                <h2>Users</h2>
                <div className="box-legend">
                    {this.renderLegendBox('#FFFFFF', '0')}
                    {this.renderLegendBox('#DDD5A6', '0 - 99')}
                    {this.renderLegendBox('#E98B2C', '100 - 249')}
                    {this.renderLegendBox('#CE4B31', '250 - 500')}
                    {this.renderLegendBox('#2C675D', '>500')}
                </div>
            </div>
        );
    }
}

export default Legend;