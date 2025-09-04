import BarNavigation from "./Navbar";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";


function Resultats(){
    return(
        <>
            <BarNavigation />
            {/*Pour plus d'espace*/}
            <div className='container mt-3 p-3 rounded text-center' 
            data-bs-theme="light" 
            ></div>

            <div className='container mt-5 p-5 rounded text-center' 
            data-bs-theme="light" 
            >
                 <h1>Résultats du Quiz</h1>
            </div>
            <div className='container mt-1 p-3 rounded' 
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
                                    <th scope="col">Note</th>
                                    <th scope="col">Réponse Correcte</th>
                                    
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <h3>Score: X/10</h3>
                    <p>Vous avez répondu correctement à X questions sur 10.</p>
                    <Button 
                        className="mb-1 mt-3">
                        <FontAwesomeIcon icon={faPlay} className="me-2" />
                        Rejouer
                    </Button>
                </div>
                <div className="col text-center">
                    <h2>Votre classement</h2>
                </div>
            </div>
            </div>
        </>
 
    )
}

export default Resultats;