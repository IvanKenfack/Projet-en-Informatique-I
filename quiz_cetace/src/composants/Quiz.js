import BarNavigation from "./Navbar"
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import {selectionneurQuestion} from "../services/Services";
import { useState, useEffect, use } from "react";



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

function Timer(){
    const [decompte, setDecompte] = useState(20);
    useEffect(() => {
        setTimeout(() => {
            setDecompte(decompte - 1);
        }, 1000);

})
    if (decompte >= 10) {
        return(
            <>
                <div className="alert alert-primary text-center" role="alert">   
                    Temps restant: {decompte} secondes
                </div>
            </>           
        )
    }
        return(
            <>
                <div className="alert alert-danger text-center" role="alert">   
                    Temps restant: {decompte} secondes
                </div>
            </>           
        )
    }
    


function GestionQuestion(){

    const idQuestions = selectionneurQuestion(10);
    const [status,setStatus] = useState('joue')
    const [indexQuestionCourante, setIndexQuestionCourante] = useState();
    const [tabBaleines, setTabBaleines] = useState([]);
    


    console.log(idQuestions);
   //const []

   useEffect(() => {
    // Logique pour charger les questions en utilisant les idQuestions
    
    }, [idQuestions]);


    return(
        <>
        <div className='container mt-5 p-3 rounded' data-bs-theme="light" >
            <div className="row">
            <h1 className='text-center mt-5'>
                Bonne chance 
                <span

                    style={{fontWeight: "bold", marginLeft: "10px"}}>
                        {localStorage.getItem('nomJoueur')}
                </span>
            </h1>
            
            <div className="col mt-4">
                <Timer />
            </div>
            </div>
        </div>
        <div className='container mt-3 p-5 rounded' data-bs-theme="light" style={{backgroundColor: '#f1f1ff'}}>
                <h2 className='text-center mt-3'>Question {}</h2>
                <div className="container mt-2 p-2 rounded" style = {{diplay:'block'}}>
                    <img 
                    className='img-fluid' 
                    alt ="Image de l'animal" 
                    src="../RESSOURCES/images/Balaenoptera-acutorostrata.png" />
                </div>
                <div className='container mt-2 p-2 rounded' style = {{diplay:'block'}}>
                    <audio controls className="data-bs-theme=dark">
                        <source src="../RESSOURCES/audio/2.wav"
                        type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className='container mt-2 p-1 rounded' style = {{diplay:'block'}}>
                    <Button variant ="info">
                        <FontAwesomeIcon icon={faEye} className="me-2" />
                        Triche un peu
                    </Button>
                </div>
                <div className='container mt-2 p-2 rounded'>
                    <h2>Choisit la bonne réponse:</h2>
                    <Options />
                </div>

                <div className='container mt-1 p-2 rounded'>
                    <Button variant="dark">
                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                        Soumettre
                    </Button>
                </div>
            </div>
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
            <GestionQuestion />
            {/* <Feedback /> */}  
        </>

    )
}

export default Quiz;