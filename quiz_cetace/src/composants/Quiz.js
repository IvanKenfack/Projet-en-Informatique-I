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



function Options({options,name,handler}){
    return(
        
        <>
            {options.map((option, index) => (
            <Form.Check 
                type="radio"
                id={`option-${index}`}
                label={option}
                name={name}
                onChange={handler}
                key={index}
                value={option}
                
            />
            ))}
        </>
        )
}

/*
    function Formulaire(){
        return(
        <>
            <Form>
                <Form.Label>Nom Commun:</Form.Label>
                <Form.Control 
                type="radio"
                id={`option-${index}`}>
                label={option}
                name={name}
                </Form.Control>
            </Form>
        </Form>
        )
    }
*/ 

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
    

function GestionQuestion({
   indexQuestionCourante, setIndexQuestionCourante, tabBaleines, setTabBaleines,optionsNomCommun, setOptionsNomCommun,
   reponseQuestionCourante, setReponseQuestionCourante, score, setScore,optionsNomScientifique, setOptionsNomScientifique,
   resultatsNomCommun, setResultatsNomCommun, resultatsNomScientifique, setResultatsNomScientifique,
   tricheUnpeu, setTricheUnpeu, utilisationIndice, setUtilisationIndice, propositionNS, setPropositionNS,
   propositionNC, setPropositionNC, indicateurSuccess1,setIndicateurSuccess1,indicateurSuccess2,setIndicateurSuccess2,status,setStatus})
   {


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

        //Trichage perso
        console.log(reponseQuestionCourante)

        const handleSoummission = (e) => {
            e.preventDefault();
            // Logique pour gérer la soumission de la réponse

            //Pour mon trichage perso
            console.log(reponseQuestionCourante)
            console.log(propositionNC)
            console.log(propositionNS)
         
            if (propositionNC === reponseQuestionCourante.nomCommun){
                setScore(prev => prev + 0.5);
                setResultatsNomCommun([...resultatsNomCommun, 0.5]);
                setIndicateurSuccess1(0.5)
            }
            else setResultatsNomCommun([...resultatsNomCommun, 0]);
            
            if (propositionNS === reponseQuestionCourante.nomScientifique){
                setScore(prev => prev + 0.5);
                setResultatsNomScientifique([...resultatsNomScientifique, 0.5]);
                setIndicateurSuccess2(0.5)
            }
            else setResultatsNomScientifique([...resultatsNomScientifique, 0]);

           setStatus('retroaction') 
                

            // Vérifier les réponses sélectionnées et mettre à jour le score
            // Passer à la question suivante ou terminer le quiz si c'est la dernière question

            

        }

        const handleButtonDisabled = () => {

        }

        const handleNSchange = (e) => {

            setPropositionNS(e.target.value);
        }

        const handleNCchange = (e) => {  

            setPropositionNC(e.target.value);
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
                    <h2 className='text-center mt-3'>Question {indexQuestionCourante}: Quel baleine produit ce son?</h2>

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
                        <h3>Choisit la bonne réponse:</h3>
                    </div>
                    <Form onSubmit={handleSoummission}>
                        <div className='row mt-2 p-2 rounded'>
                            <div className='col mt-2 p-2 rounded'>
                                <h6>Nom Commun:</h6>
                                <Options options={optionsNomCommun} name="options1" handler={handleNCchange}/>
                            </div>
                            <div className='col mt-2 p-2 rounded'>
                                <h6>Nom Scientifique:</h6>
                                <Options options={optionsNomScientifique} name="options2" handler={handleNSchange}/>
                            </div>
                            
                            <div className='col-4 mt-2 p-2 rounded'>
                            </div>
                        </div>

                        <div className='container mt-1 p-2 rounded'>
                            <Button 
                            variant="dark"
                            type="submit"
                            onClick={handleSoummission}
                            >
                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                Soumettre
                            </Button>
                        </div>
                    </Form>
                </div>
            </>      

        )
}




function Feedback({status,indicateurSuccess1,indicateurSuccess2,reponseQuestionCourante}){
    if(status === "retroaction" && indicateurSuccess1 + indicateurSuccess2 === 1){
        return(
            <>
                <div className="alert alert-success" role="alert">
                    Correct! Bien joué.
                </div>
            </>
        )
    } else if(status === "retroaction" && indicateurSuccess1 + indicateurSuccess2 === 0.5){
        return(
            <>
                <div className="alert alert-warning" role="alert">
                    {`Bien éssayé. Les bonnes réponse était:<p>${reponseQuestionCourante.nomCommun} & <br>${reponseQuestionCourante.nomScientifique}</br></p> `}
                </div>
            </>
        )
    } else if(status === "retroaction" && indicateurSuccess1 + indicateurSuccess2 === 0){
        return(
            <>
                <div className="alert alert-danger" role="alert">
                    Vous aurez plus de chances à la prochaine question.
                </div>
            </>
    );
    } else{
        return null
    }
}




function Quiz(){ 
        const [status,setStatus] = useState('chargement');
        const [indexQuestionCourante, setIndexQuestionCourante] = useState(1);
        const [tabBaleines, setTabBaleines] = useState([]);
        const [reponseQuestionCourante, setReponseQuestionCourante] = useState(null);
        const [score, setScore] = useState(0);
        const [questionCourante, setQuestionCourante] = useState({});
        const [resultatsNomCommun, setResultatsNomCommun] = useState([]);
        const [resultatsNomScientifique, setResultatsNomScientifique] = useState([]);
        const [optionsNomCommun, setOptionsNomCommun] = useState([]);
        const [optionsNomScientifique, setOptionsNomScientifique] = useState([]);
        const [tricheUnpeu, setTricheUnpeu] = useState(false);
        const [utilisationIndice, setUtilisationIndice] = useState(0);
        const [propositionNS, setPropositionNS] = useState("");
        const [propositionNC, setPropositionNC] = useState("");
        const [indicateurSuccess1,setIndicateurSuccess1] = useState(0)
        const [indicateurSuccess2,setIndicateurSuccess2] = useState(0)
    return(
        <>
            <BarNavigation />
            <GestionQuestion 
            status={status}
            setStatus={setStatus}
            indexQuestionCourante={indexQuestionCourante}
            setIndexQuestionCourante={setIndexQuestionCourante}
            tabBaleines={tabBaleines}
            setTabBaleines={setTabBaleines}
            reponseQuestionCourante={reponseQuestionCourante}
            setReponseQuestionCourante={setReponseQuestionCourante}
            score={score}
            setScore={setScore}
            questionCourante={questionCourante}
            setQuestionCourante={setQuestionCourante}
            resultatsNomCommun={resultatsNomCommun}
            setResultatsNomCommun={setResultatsNomCommun}
            resultatsNomScientifique={resultatsNomScientifique}
            setResultatsNomScientifique={setResultatsNomScientifique}
            optionsNomCommun={optionsNomCommun}
            setOptionsNomCommun={setOptionsNomCommun}
            optionsNomScientifique={optionsNomScientifique}
            setOptionsNomScientifique={setOptionsNomScientifique}
            tricheUnpeu={tricheUnpeu}
            setTricheUnpeu={setTricheUnpeu}
            utilisationIndice={utilisationIndice}
            setUtilisationIndice={setUtilisationIndice}
            propositionNS={propositionNS}
            propositionNC={propositionNC}
            setPropositionNC={setPropositionNC}
            setPropositionNS={setPropositionNS}
            indicateurSuccess1={indicateurSuccess1}
            setIndicateurSuccess1={setIndicateurSuccess1}
            indicateurSuccess2={indicateurSuccess2}
            setIndicateurSuccess2={setIndicateurSuccess2}

            />
            <Feedback 
            status={status}
            indicateurSuccess1={indicateurSuccess1}
            indicateurSuccess2={indicateurSuccess2}
            reponseQuestionCourante={reponseQuestionCourante}/>  
        </>

    )
}

export default Quiz;