import BarNavigation from "./Navbar"
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';


function Options(){
    return(
        <>
            <Form.Check 
                type="radio"
                id="option1"
                label="Option 1"
                name="options"
            />
            <Form.Check 
                type="radio"
                id="option2"
                label="Option 2"
                name="options"
            />
            <Form.Check 
                type="radio"
                id="option3"
                label="Option 3"
                name="options"
            />
            <Form.Check 
                type="radio"
                id="option4"
                label="Option 4"
                name="options"
            />
             <Form.Check 
                type="radio"
                id="option5"
                label="Option 5"
                name="options"
            />
        </>
    )
}


/*
function Feedback(){
    if(){
        return(
            <>
                <div className="alert alert-success" role="alert">
                    Correct! Bien joué.
                </div>
            </>
        )
    } elseif(){
        return(
            <>
                <div className="alert alert-danger" role="alert">
                    Incorrect! La bonne réponse était ...
                </div>
            </>
        )
    } else{
        return null;
    } 
}
*/



function Quiz(){ 

    return(
        <>
            <BarNavigation />
            <div className='container mt-5 p-5 rounded' data-bs-theme="light" style={{backgroundColor: '#f1f1ff'}}>
                <h1 className='text-center mt-3'>Question {}</h1>
                <div className='container mt-2 p-5 rounded' style = {{diplay:'block'}}>
                    <img 
                    className='img-fluid' 
                    alt ="Image de l'animal" 
                    src="../RESSOURCES/images/Balaena-mysticetus.png" />
                </div>
                <div className='container mt-2 p-2 rounded' style = {{diplay:'block'}}>
                    <audio controls className="data-bs-theme=dark">
                        <source src="../RESSOURCES/audio/1.wav"
                        type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className='container mt-2 p-5 rounded' style = {{diplay:'block'}}>
                    <Button variant ="info">
                        <FontAwesomeIcon icon={faEye} className="me-2" />
                        Triche un peu
                    </Button>
                </div>
                <div className='container mt-2 p-2 rounded'>
                    <h2>Choisit la bonne réponse:</h2>
                    <Options />
                </div>

                <div className='container mt-1` p-2 rounded'>
                    <Button variant="dark">
                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                        Soumettre
                    </Button>
                </div>
            </div>
        </>

    )
}

export default Quiz;