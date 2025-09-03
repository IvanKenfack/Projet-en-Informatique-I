import BarNavigation from "./Navbar"
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import {selectionneurQuestion,MelangeurTableau} from "../services/Services";
import { useState, useEffect} from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';



function Options({options,name}){
    return(
        
        <>
            {options.map((option, index) => (
            <Form.Check 
                type="radio"
                id={`option-${index}`}
                label={option}
                name={name}
            />
            ))}
        </>
        )
}

function Timer(){

    const [decompte, setDecompte] = useState(20);
    useEffect(() => {
        setTimeout(() => {
            setDecompte(decompte - 1);
        }, 1000);     // Décrémente le compteur toutes les secondes (1000 ms)

    },[]);   // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois, au montage du composant   

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

    
        const [status,setStatus] = useState('chargement');
        const [indexQuestionCourante, setIndexQuestionCourante] = useState(1);
        const [tabBaleines, setTabBaleines] = useState([]);
        const [reponseQuestionCourante, setReponseQuestionCourante] = useState(null);
        const [score, setScore] = useState(0);
        const [questionCourante, setQuestionCourante] = useState({});
        const [resultatParQuestion, setResultatParQuestion] = useState([{}]);
        const [optionsNomCommun, setOptionsNomCommun] = useState([]);
        const [optionsNomScientifique, setOptionsNomScientifique] = useState([]);
        const [tricheUnpeu, setTricheUnpeu] = useState(false);
        const [utilisationIndice, setUtilisationIndice] = useState(0);

        const handleTriche = (e) => {
            e.preventDefault();
            setTricheUnpeu(prec => !prec)
            
        }


    useEffect(() => {
            // Logique pour charger les questions en utilisant les idQuestions
            const idQuestions = selectionneurQuestion(10);
            const question = async () => {
                try{
                    // On récupère la question courante
                    const reponseBaleine = await axios.get(`http://localhost:5000/api/baleines/${idQuestions[indexQuestionCourante - 1]}`);
                    setReponseQuestionCourante(reponseBaleine.data);
                    localStorage.setItem('questionCourante', reponseBaleine.data);

                    // On récupère toutes les baleines pour les options
                    const tabBaleines = await axios.get('http://localhost:5000/api/baleines');

                    // On prépare les options pour le nom commun
                    let optionsNomCommun = [reponseBaleine.data.nomCommun];

                    // On mélange le tableau des baleines
                    setTabBaleines(MelangeurTableau(tabBaleines.data));

                    // On ajoute des noms communs jusqu'à avoir 5 options
                    let i = 0;
                    while (optionsNomCommun.length < 5 && i < tabBaleines.data.length) {
                        //
                        const nomCommun = tabBaleines.data[i].nomCommun;
                        if (!optionsNomCommun.includes(nomCommun)) {
                            optionsNomCommun.push(nomCommun);
                        }
                        i++;
                    }
                    setOptionsNomCommun(MelangeurTableau(optionsNomCommun));
                    
                    // On prépare les options pour le nom scientifique
                    let optionsNomScientifique = [reponseBaleine.data.nomScientifique];
                    i = 0;
                    while (optionsNomScientifique.length < 5 && i < tabBaleines.data.length) {
                        const nomScientifique = tabBaleines.data[i].nomScientifique;
                        if (!optionsNomScientifique.includes(nomScientifique)) {
                            optionsNomScientifique.push(nomScientifique);
                        }
                        i++;
                    }
                    setOptionsNomScientifique(MelangeurTableau(optionsNomScientifique));
                    console.log(optionsNomScientifique);
                    

                }
                catch (error){
                    console.error("Erreur lors de la récupération des questions:", error);
                
                }
                finally{
                    setStatus('prêt');
        
                }
            }
            question();

        },[]);

        useEffect(() => {
            if(tricheUnpeu === true)
                setUtilisationIndice(prec => prec + 1);
            },[tricheUnpeu]);

        if (status === 'chargement' || reponseQuestionCourante === null) {
            return(
            <>
                <div className='container mt-3 p-3 rounded' data-bs-theme="light" style={{backgroundColor: '#f1f1fa', textAlign: 'center'}}>   
                    <Spinner animation="border" variant="primary" role="status" size="lg"/>   
                </div>
            </>
            );
        }

        return(
            <>
        <div className='container mt-5 p-3 rounded' data-bs-theme="light" >
                <div className="col">
                    <h1 className='text-center mt-5'>
                        Bonne chance 
                        <span

                            style={{fontWeight: "bold", marginLeft: "10px"}}>
                                {localStorage.getItem('nomJoueur')}
                        </span>
                    </h1>
                </div>
                <div className="col mt-4">
                    <Timer />
                </div>    
            </div>

            <div className='container mt-3 p-5 rounded' data-bs-theme="light" style={{backgroundColor: '#f1f1ff'}}>
                    <h2 className='text-center mt-3'>Question {indexQuestionCourante}</h2>

                    <div className="container mt-2 p-2 rounded" style = {{display:tricheUnpeu ? 'block' : 'none'}}>
                        <img 
                        className='img-fluid' 
                        alt ="Image de la baleine" 
                        src={`../RESSOURCES${reponseQuestionCourante.medias[0].cheminFichier}`}
                        />
                    </div>
                    <div className='container mt-2 p-2 rounded' style = {{display:'block'}}>
                        {reponseQuestionCourante.medias.filter(element =>
                            element.typeMedia === "audio").map((element,index) => (
                                
                                    <audio controls className="data-bs-theme=dark" key={index}>
                                        <source src={`../RESSOURCES${element.cheminFichier}`}
                                        type="audio/wav" />
                                        Your browser does not support the audio element.
                                    </audio>
                                ))
                                
                        }

                        <audio controls className="data-bs-theme=dark">
                            <source src="../RESSOURCES/audio/2.wav"
                            type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                    <div className='container mt-2 p-1 rounded' style = {{diplay:'block'}}>
                        <Button variant ="info" onClick={(e) => handleTriche(e)} disabled={utilisationIndice >= 2}>
                            <FontAwesomeIcon icon={faEye} className="me-2" beat/>
                            Triche un peu
                        </Button>
                    </div>

                    <div className="container mt-4 p-1 rounded">
                        <h2>Choisit la bonne réponse:</h2>
                    </div>
                    <div className='row mt-2 p-2 rounded'>
                        <div className='col mt-2 p-2 rounded'>
                            <h5>Nom Commun:</h5>
                            <Options options={optionsNomCommun} name="options1" />
                        </div>
                        <div className='col mt-2 p-2 rounded'>
                            <h5>Nom Scientifique:</h5>
                            <Options options={optionsNomScientifique} name="options2"/>
                        </div>
                        
                        <div className='col-4 mt-2 p-2 rounded'>
                        </div>
                    </div>

                    <div className='container mt-1 p-2 rounded'>
                        <Button 
                        variant="dark"
                        >
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