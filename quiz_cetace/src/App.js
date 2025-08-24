
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Acceuil from "./composants/Acceuil";
import Quiz from "./composants/Quiz";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";




function App() {

  return (
    <>
    <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Acceuil />}
                    />
                    <Route
                        path="/Quiz"
                        element={<Quiz />}
                    />
                </Routes>
    </BrowserRouter>
    </>
  );
}



export default App;