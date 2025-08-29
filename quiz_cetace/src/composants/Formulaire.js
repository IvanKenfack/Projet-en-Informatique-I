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
    const [status, setStatus] = useState('saisit'); // Pour gérer les messages d'erreur ou de succès

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('soummet');

        // Logique pour traiter le formulaire
        let nom = document.getElementById('inlineFormInput').value;
        let userName = document.getElementById('inlineFormInputGroup').value;
        //console.log(`Nom: ${nom}, Nom d'utilisateur: ${userName}`);


        navigate('./Quiz');
    };

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
                    />
                    </Col>
                    <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInputGroup">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                        Donnez-vous un nom d'utilisateur:
                    </Form.Label>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control id="inlineFormInputGroup" />
                    </InputGroup>
                    </Col>
                    <Col xs="auto">
                    </Col>
                    <Col xs="auto" className="d-flex justify-content-center">
                    <Button type="submit" className="mb-1 mt-3" onClick={handleSubmit}>
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