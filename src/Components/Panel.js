import React from 'react';
import '../styles/PanelGrid.css';
import { BsMagic } from "react-icons/bs";
import { useState } from 'react';
import Loader from "react-js-loader";


function Panel(){

    const [prompt, setPrompt] = useState('');
    const [src, setSrc] = useState('');
    const [error,setError] = useState('');
    const [loading ,setLoading] = useState(false);

    async function query(data) {
        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: { 
                    "Accept": "image/png",
                    "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }

    

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!prompt || prompt === ''){
            setError('Please enter a prompt');
            return;
        }    
        
        const data = {
            "inputs": prompt
        }
        setLoading(true);
        query(data).then((response) => {
            
           
            const blobURL = URL.createObjectURL(response);
            setLoading(false);
            setSrc(blobURL);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            setError('Something went wrong');
        })
        
    }

    const handleInputChange = (e) => {
        setPrompt(e.target.value);
    }

  return (
    <>
        <div className='panel'>
           <div className='image-container'>
            {src !== '' ? <img src={src} className='panel-image' alt='generated Img'/> : 
            <div className='text-container'> 
            {error !== '' ? <p className='error'>{error}</p> :(
                <>
                {loading ? <Loader type="box-rectangular" bgColor={'white'} color={'white'} title={"Image is being generated"} size={100} /> : <>Your Image will be generated here</>}
                </>
            )}
                 
            </div>
            }
            </div>
            <form className='input-container' onSubmit={handleSubmit}>
                <input className='input' type='text' placeholder='Add your Prompt' value={prompt} onChange={handleInputChange}/>
                <button className='button' onClick={handleSubmit}><BsMagic color='white' size={'1.5rem'}/></button>
            </form>
        </div>
    </>
  )
}

export default Panel