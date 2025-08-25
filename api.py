from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import sqlite3

app = Flask(__name__)
api = Api(app)

BASE_DE_DONNÉE = 'BD_Baleines.db'

def etablirConnexionBD():
    connexionBD = sqlite3.connect(BASE_DE_DONNÉE)
    connexionBD.row_factory = sqlite3.Row
    return connexionBD

class BaleineResource(Resource):
    def get(self, IdBaleine):
        """Récupère une baleine spécifique par son ID"""
        connexionBD = etablirConnexionBD()
        cursor = connexionBD.cursor()
        cursor.execute('SELECT IdBaleine, nomCommun, nomScientifique FROM baleines WHERE IdBaleine = ?', (IdBaleine,))
        baleine = cursor.fetchone()
        connexionBD.close()
        
        if baleine:
            return jsonify(dict(baleine))
        return {'message': 'Baleine non trouvée'}, 404
    

class BaleinesResource(Resource):
    def get(self):
        """Récupère toutes les baleines"""
        conn = etablirConnexionBD()
        cursor = conn.cursor()
        cursor.execute('SELECT IdBaleine, nomCommun, nomScientifique FROM baleines')
        baleines = cursor.fetchall()
        conn.close()
        return jsonify([dict(baleine) for baleine in baleines])


    
class MediaResource(Resource):
    def get(self, IdBaleine):
        """Récupère tous les médias d'une baleine spécifique"""
        connexionBD = etablirConnexionBD()
        cursor = connexionBD.cursor()
        cursor.execute('SELECT IdMedia, typeMedia, cheminFichier, IdBaleine FROM media WHERE IdBaleine = ?', (IdBaleine,))
        medias = cursor.fetchall()
        connexionBD.close()
        return jsonify([dict(media) for media in medias])
    
class PartieResource(Resource):
    def get(self):
        """Récupère toutes les parties"""
        connexionBD = etablirConnexionBD()
        cursor = connexionBD.cursor()
        cursor.execute('SELECT IdPartie, nomJoueur, score, nomUtilisateur FROM partie ORDER BY score DESC')
        parties = cursor.fetchall()
        connexionBD.close()
        return jsonify([dict(partie) for partie in parties])

    
    def post(self):
        """Stocke les infos d'une partie terminée"""
        donnees = request.get_json()

        if not donnees or 'nomJoueur' not in donnees or 'score' not in donnees or 'nomUtilisateur' not in donnees:
            return {'message': 'Données invalides'}, 400
        
        connexionBD = etablirConnexionBD()
        cursor = connexionBD.cursor()

        try:
            cursor.execute('INSERT INTO partie (nomJoueur, score, nomUtilisateur) VALUES (?, ?, ?)', 
                           (donnees['nomJoueur'], donnees['score'], donnees['nomUtilisateur']))
            connexionBD.commit()
            nouvel_Id = cursor.lastrowid

            # On retourne un message de succès avec l'ID de la nouvelle partie
            return {'message': 'Partie enregistrée avec succès',
                    'IdPartie': nouvel_Id,
                    'nomJoueur': donnees['nomJoueur'],
                    'nomUtilisateur': donnees['nomUtilisateur'],
                    'score': donnees['score']
                    }, 201
        except sqlite3.Error as e:

            #On annule les modifications en cas d'erreur
            connexionBD.rollback()
            return {'message': 'Erreur lors de l\'enregistrement de la partie', 'erreur': str(e)}, 500
        finally:
            connexionBD.close()

        


    
# Configuration des routes
api.add_resource(BaleinesResource, '/api/baleines')
api.add_resource(BaleineResource, '/api/baleines/<int:IdBaleine>')
api.add_resource(MediaResource, '/api/baleines/<int:IdBaleine>/media')
api.add_resource(PartieResource, '/api/parties')

if __name__ == '__main__':
    app.run(debug=True)
