import BarNavigation from "./Navbar";


function Resultats(){
    return(
        <>
            <BarNavigation />
            <div className='container mt-5 p-5 rounded' data-bs-theme="light" style={{backgroundColor: '#f1f1ff'}}>
            <div className="row">
                <div className="col text-center">
                    <h2>Résultats du Quiz</h2>
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
                    <button className="btn btn-primary">Rejouer</button>
                </div>
                <div className="col text-center">
                    <h2>Classement actuel</h2>
                </div>
            </div>
            </div>
        </>
 
    )
}