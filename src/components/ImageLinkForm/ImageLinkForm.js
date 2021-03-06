import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className=''>
        <p className='f3'>{`This Magic Brain will detect faces.Give it a try!`}</p>
        <div className='center'>
            <div className='pa4 br3 shadow-5 form'>
            <input type='text' className='f4 pa2 w-70' onChange={onInputChange}/>
            <button onClick={onSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect!</button>
            </div>
        </div>
        </div> 
    )
}



 




export default ImageLinkForm;