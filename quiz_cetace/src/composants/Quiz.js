function GestionQuestion({
   indexQuestionCourante, setIndexQuestionCourante, tabBaleines, setTabBaleines,optionsNomCommun, setOptionsNomCommun,
   reponseQuestionCourante, setReponseQuestionCourante, score, setScore,optionsNomScientifique, setOptionsNomScientifique,
   resultatsNomCommun, setResultatsNomCommun, resultatsNomScientifique, setResultatsNomScientifique,
   tricheUnpeu, setTricheUnpeu, utilisationIndice, setUtilisationIndice, propositionNS, setPropositionNS,
   propositionNC, setPropositionNC, indicateurSuccess1,setIndicateurSuccess1,indicateurSuccess2,setIndicateurSuccess2,status,setStatus}) {

    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(new AbortController());

    useEffect(() => {
        // Cancel any pending requests when the component unmounts or when question changes
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const fetchQuestion = async () => {
            setLoading(true);
            setStatus('chargement');
            
            // Reset states for new question
            setTricheUnpeu(false);
            setPropositionNS("");
            setPropositionNC("");
            setIndicateurSuccess1(0);
            setIndicateurSuccess2(0);
            
            try {
                const idQuestions = selectionneurQuestion(10);
                const newController = new AbortController();
                setController(newController);
                
                // On récupère la question courante
                const reponseBaleine = await axios.get(
                    `http://localhost:5000/api/baleines/${idQuestions[indexQuestionCourante - 1]}`,
                    { signal: newController.signal }
                );
                
                setReponseQuestionCourante(reponseBaleine.data);

                // On récupère toutes les baleines pour les options
                const tabBaleines = await axios.get(
                    'http://localhost:5000/api/baleines',
                    { signal: newController.signal }
                );

                // On prépare les options pour le nom commun
                let optionsNomCommun = [reponseBaleine.data.nomCommun];
                
                // On mélange le tableau des baleines
                setTabBaleines(MelangeurTableau(tabBaleines.data));

                // On ajoute des noms communs jusqu'à avoir 5 options
                let i = 0;
                while (optionsNomCommun.length < 5 && i < tabBaleines.data.length) {
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
                
            } catch (error) {
                if (error.name === 'CanceledError') {
                    console.log('Request canceled');
                } else {
                    console.error("Erreur lors de la récupération des questions:", error);
                }
            } finally {
                setLoading(false);
                setStatus('prêt');
            }
        };
        
        fetchQuestion();
    }, [indexQuestionCourante]); // Add indexQuestionCourante to dependency array

    // Rest of your component code...
}