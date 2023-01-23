import React from "react";
import brain from "./brain.png";
import Tilt from 'react-parallax-tilt';
import "./Navigation.css";

const Navigation = ({ onSignOut, isSignedIn }) => {

    if (isSignedIn) {
    return (
        <div id="navigation_parent_div">
            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Tilt className="Tilt" options={{ max: 55 }} style={{ height: 150, width: 150 }}>
                    <div>
                        <h4 id="logo" style={{ alignItems: "center" }}>AI Brain</h4>
                        <img src={brain} alt="AI Brain" style={{ height: 80, width: 80, alignItems: "center" }} />
                    </div>
                </Tilt>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className="f4 link dim black underline pointer" id="signout_Button" onClick={() => onSignOut('signin')}>Sign Out</p>
                </div>
            </nav>
            </div>
        )
    }   
    else {
        return (
            <div id="navigation_parent_div">
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tilt id="logo-container" className="Tilt" options={{ max: 55 }} style={{ height: 150, width: 150 }}>
                        <div>
                            <h4 id="logo" style={{ alignItems: "center" }}>AI Brain</h4>
                            <img src={brain} alt="AI Brain" style={{ height: 80, width: 80, alignItems: "center" }} />
                        </div>
                    </Tilt>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    </div>
                </nav>
            </div>
            )
        }
    }

    
export default Navigation;