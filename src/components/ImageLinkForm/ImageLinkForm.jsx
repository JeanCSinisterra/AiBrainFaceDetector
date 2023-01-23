import React from "react";
import 'aos/dist/aos.css'
import "./imageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => {
    return (
        <section id="input_form" data-aos="fade-up">
            <p className="f3">
                The AI Brain will detect the faces in your pictures for you!
            </p>
            <div className="center">
                <div id="input_box" style={{ display: "flex", justifyContent: "center"}} className="shadow-5">
                    <input id="analyse_text" type="text" onChange={onInputChange}></input>
                    <button id="analyse_button" onClick={onBtnSubmit}>ANALYSE</button>
                </div>
            </div>
        </section>
    )
}

export default ImageLinkForm;