import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Carousel_() {

    const [scores, setScores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // On récupère les anciens scores depuis l'API
        const obtenirScores = async () =>{
            try {
                const reponse = await axios.get('http://localhost:5000/api/parties');

                //On met à jour l'état avec les scores récupérés
                setScores(reponse.data);
            }
            catch (error) {
                console.error("Erreur lors de la récupération des scores:", error);
            }
            finally {
                setIsLoading(false);
            }
        }
        obtenirScores();

    }, []);

    if (isLoading) {
        return (
        <>
            <div className='container mt-3 p-3 rounded' data-bs-theme="light" style={{backgroundColor: '#f1f1fa', textAlign: 'center'}}>   
                <Spinner animation="border" variant="primary" role="status" size="lg"/>   
            </div>
        </>
        )
    }

    console.log(scores)
    console.log(scores[0])
  return (
    
    <>
       {/*Courtoisie de https://react-bootstrap.netlify.app/docs/forms/input-group/*/}

        <div className='container mt-3 p-3 rounded'data-bs-theme="light" style={{backgroundColor: '#f1f1f7'}}>
            <Carousel data-bs-theme="dark">
                {scores.map((score, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"

                            // Courtoisie de https://placehold.co/
                            src={`https://placehold.co/384x216?text=${score.score}/10&font=Montserrat`}
                            alt={`${score.score}`}
                            />
                        <Carousel.Caption>
                            <h5>{score.nomJoueur}</h5>
                            <p>{score.nomUtilisateur}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    </>
  );
}

export default Carousel_;