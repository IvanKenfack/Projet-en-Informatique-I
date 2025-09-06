import BarNavigation from "./Navbar";
import {Button,Container,Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Resultats(){

    const [resDetNS, setResDetNS] = useState([])
    const [resDetNC, setResDetNC] = useState([])
    const [score, setScore] = useState(0)
    const [ancienParties, setAncienParties] = useState([])
    const [enCharge, setEnCharge] = useState(true)
    const [status,setStatus] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{

        const tab1 = JSON.parse(localStorage.getItem('tabReponsesNC') || "[]")
        setResDetNC(tab1)
        const tab2 = JSON.parse(localStorage.getItem('tabReponsesNS') || "[]")
        setResDetNS(tab2)

        const scoreEnregistree = localStorage.getItem('score')
        setScore(scoreEnregistree ? Number(scoreEnregistree) : 0)

       
    },[resDetNC,resDetNS]);

    useEffect(() => {

             axios.get('http://localhost:5000/api/parties')
                .then((response)=>{
                    
                    setAncienParties(response.data)
                    console.log(response.data)
                
                })
                .finally(() =>{
                    
                })
           
            },[]);

    const handleCliqueRejouer = (e) =>{

        localStorage.removeItem('tabReponsesNS');
        localStorage.removeItem('tabreponsesNC');
        localStorage.removeItem('score')
        
        navigate('/Quiz')

    }

    const handleCliqueAcceuil = (e) =>{
        
        localStorage.clear();
        
        navigate('/')

    }

    return(
        <>

                <BarNavigation />

                {/*Pour plus d'espace*/}
                <div 
                    className='container mt-3 p-3 rounded text-center' 
                    data-bs-theme="light" 
                ></div>

                <div 
                    className='container mt-5 p-5 rounded text-center' 
                    data-bs-theme="light" 
                >
                    <h1>Résultats du Quiz</h1>
                </div>
                <div 
                    className='container mt-1 p-3 rounded' 
                    data-bs-theme="light" 
                    style={{backgroundColor: '#f1f1ff'}}>
                
                <div className="row">
                    <div className="col text-center">
                        <h3>Voici vos résultats {localStorage.getItem('nomUtilisateur')}</h3>
                        <div className="container mt-1 p-1 rounded" style = {{diplay:'block'}}>
                            <table className="table table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Question</th>
                                        <th scope="col">NoteNS</th>
                                        <th scope="col">NoteNC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { resDetNS.map((noteNS,i) => (

                                            <tr key={i}>
                                            <td>{i+1}</td>

                                            {/*Si la note est inferieur à 0.5, donc 0, elle s'affiche en rouge*/}
                                            <td style={{color: noteNS < 0.5 ? '#f2668b':'black'}}>{noteNS}</td>
                                            <td style={{color: resDetNC[i] < 0.5 ? '#f2668b':'black'}}>{resDetNC[i]}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h4>Score: {score}/10</h4>
                        <p>Vous avez répondu correctement à {score} questions sur 10.</p>

                    </div>
                    <div className="col text-center">
                        <h3>Votre classement</h3>
                        <div className="container mt-1 p-1 rounded" style = {{diplay:'block'}}>
                            <table className="table table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Nom d'Utilisateur</th>
                                        <th scope="col">Score</th>
                                        <th scope="col">Rang</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {ancienParties.map((ancienPartie, i) => (
                                        ancienPartie.nomJoueur === localStorage.getItem("nomJoueur") ? (
                                            <tr className="table-info" key={i}>
                                            <td>{ancienPartie.nomJoueur}</td>
                                            <td>{ancienPartie.nomUtilisateur}</td>
                                            <td>{ancienPartie.score}</td>
                                            <td>{i + 1}</td>
                                            </tr>
                                        ) : (
                                            <tr key={i}>
                                            <td>{ancienPartie.nomJoueur}</td>
                                            <td>{ancienPartie.nomUtilisateur}</td>
                                            <td>{ancienPartie.score}</td>
                                            <td>{i + 1}</td>
                                            </tr>
                                        )
                                        ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Row>
                    <Container className="d-flex justify-content-center align-items-center">
                            <Button 
                            className="mb-5 mt-3 me-4 w-25"
                            onClick={handleCliqueRejouer}
                            >

                            <FontAwesomeIcon icon={faPlay} className="me-2" shake/>
                            Rejouer
                        </Button>

                        <Button
                            variant="outline-primary" 
                            className="mb-5 mt-3 ms-4 w-25"
                            onClick={handleCliqueAcceuil}>
                                
                            <FontAwesomeIcon icon={faHome} className="me-2" />
                            Acceuil
                        </Button>
                    </Container>

                </Row>
            </div>
        </>
 
    )
}

export default Resultats;