import { useState } from 'react';

//Importation des composants Bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

//Importation des icônes FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faUser as faUserRegular} from '@fortawesome/free-regular-svg-icons';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';


function Formulaire(){

    const navigate = useNavigate();
    const [nomJoueur, setNomJoueur] = useState('');
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [status, setStatus] = useState('saisit');

    // Gestion de la soumission du formulaire
    const handleSoummet = (e) => {
        e.preventDefault();

        // Au clique du bouton commencer le quiz, le formulaire est soumis et le bouton est désactivé
        setStatus('soummet');

        // Stockage des informations du joueur dans le localStorage pour les réutiliser à la fin du­­­ quiz
        localStorage.setItem('nomJoueur', nomJoueur);
        localStorage.setItem('nomUtilisateur', nomUtilisateur);

        // Et enfin, redirection vers la page du quiz
        navigate('./Quiz');
    };

    //Lorsque l'utilisateur modifie les champs du formulaire, le bouton commencer le quiz est desactivé

    function handleNomJoueurChange(e){
        setNomJoueur(e.target.value);
        setStatus('saisit');
    }

    function handleNomUtilisateurChange(e){
        setNomUtilisateur(e.target.value);
        setStatus('saisit');
    }

    return(
        <>
             <div className='container p-3 rounded' data-bs-theme="light"style={{backgroundColor: '#f1f1f7'}}>
                <Form>
                    <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInput">
                        <FontAwesomeIcon icon={faUserRegular}  className="me-2" />
                        Votre nom:
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        value={nomJoueur}
                        onChange={handleNomJoueurChange}
                    />
                    </Col>
                    <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInputGroup">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                        Donnez-vous un nom d'utilisateur:
                    </Form.Label>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control 
                        id="inlineFormInputGroup" 
                        value={nomUtilisateur}
                        onChange={handleNomUtilisateurChange}/>
                    </InputGroup>
                    </Col>
                    <Col xs="auto">
                    </Col>
                    <Col xs="auto" className="d-flex justify-content-center">
                    <Button 
                    type="submit" 
                    className="mb-1 mt-3" 
                    onClick={handleSoummet}

                    // Le bouton est désactivé si le formulaire a déjà été soumis ou si au moins un des deux champs est vide
                    disabled={status === 'soummet' || 
                            nomJoueur.length === 0 && nomUtilisateur.length === 0 ||
                            nomJoueur.length === 0 && nomUtilisateur.length > 0 ||
                            nomJoueur.length > 0 && nomUtilisateur.length === 0 
                            }>
                        <FontAwesomeIcon icon={faPlay} className="me-2" />
                        Commencer le quiz
                    </Button>
                    </Col>      
                </Form>         
            </div>
        </>
    )
}


export default Formulaire;