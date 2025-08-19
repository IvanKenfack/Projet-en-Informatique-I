
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import Formulaire from './Formulaire';
import Carousel_ from './AutreScores';



function Acceuil() {
  return (
    <>
        <div className='container mt-3 p-5 rounded'>
            <h1 className='text-center mt-5'>
                    <FontAwesomeIcon icon={faWater} className='me-2' fade/>
                    Bienvenue sur QuizCétacé
            </h1>
            <p className='text-center mt-3'>
                Le but de ce jeu est de faire correspondre un son à l’image ou au nom 
                exacte d'un animal marin.     
            </p>

            <p className='text-center mt-3'>
                Vous aurez 10 secondes pour répondre à chaque question. Bonne chance!
            </p>
        </div>
        <div className='container mt-3 p-5 rounded' data-bs-theme="light" style={{backgroundColor: '#f1f1fa'}}>
            <h3 className='text-center'>Pour commencer, veuillez remplir le formulaire ci-dessous:</h3>
            <Formulaire />
        </div>
        <div className='container-fluid mt-3 p-5 rounded'>
            <h3 className='text-center'>Quelques scores récents:</h3>
            <Carousel_ />
         </div>
       
    </>
  );
}

export default Acceuil;