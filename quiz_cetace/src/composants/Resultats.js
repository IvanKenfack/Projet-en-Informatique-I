import BarNavigation from "./Navbar";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";


function Resultats(){

    const [resDetNS, setResDetNS] = useState([])
    const [resDetNC, setResDetNC] = useState([])
    const [score, setScore] = useState(0)
    const [ancienParties, setAncienParties] = useState([])
    const [enCharge, setEnCharge] = useState(true)
    const [status,setStatus] = useState('')

    useEffect(()=>{

        const tab1 = localStorage.getItem(tabReponsesNC)
        setResDetNC(tab1)
        const tab2 = localStorage.getItem(tabReponsesNS)
        setResDetNS(tab2)
        setScore(localStorage.getItem(score))

       
    },[resDetNC,resDetNS])

    useEffect(() => {

             axios.get('http://localhost:5000/api/parties')
                .then((response)=>{
                    
                    setAncienParties(response.data)

                })
                .finally(() =>{
                    console.log(response.data)
                })
           
            },[]);  

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
                    
                    <p>Merci d'avoir participé au quiz! Voici vos résultats:</p>
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
                                {resDetNS.map((noteNS,i) => (
                                  <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{noteNS}</td>
                                    <td>{resDetNC[i]}</td>
                                  </tr>  
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3>Score: {score}/10</h3>
                    <p>Vous avez répondu correctement à {score} questions sur 10.</p>
                    <Button 
                        className="mb-1 mt-3">
                        <FontAwesomeIcon icon={faPlay} className="me-2" />
                        Rejouer
                    </Button>
                </div>
                <div className="col text-center">
                    <h2>Votre classement</h2>
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
                                {ancienParties.map((ancienPartie,i) => (
                                  <tr key={i}>
                                    <td>{ancienPartie.nomJoueur}</td>
                                    <td>{ancienPartie.nomUtilisateur}</td>
                                    <td>{ancienPartie.score}</td>
                                    <td>{i+1}</td>
                                  </tr>  
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
 
    )
}

export default Resultats;