from flask import Flask, jsonify
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
    def get(self, baleine_id):
        """Récupère une baleine spécifique par son ID"""
        connexionBD = etablirConnexionBD()
        cursor = connexionBD.cursor()
        cursor.execute('SELECT baleineId, nomCommun, nomScientifique FROM baleines WHERE baleineId = ?', (baleine_id,))
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
        cursor.execute('SELECT baleineId, nomCommun, nomScientifique FROM baleines')
        baleines = cursor.fetchall()
        conn.close()
        return jsonify([dict(baleine) for baleine in baleines])


    
class MediaResource(Resource):
    def get(self, baleine_id):
        """Récupère tous les médias d'une baleine spécifique"""
        connexionBD = etablirConnexionBD()
        cursor = connexionBD.cursor()
        cursor.execute('SELECT mediaId, cheminImage, cheminAudio, baleineId FROM media WHERE baleineId = ?', (baleine_id,))
        medias = cursor.fetchall()
        connexionBD.close()
        return jsonify([dict(media) for media in medias])

    
# Configuration des routes
api.add_resource(BaleinesResource, '/api/baleines')
api.add_resource(BaleineResource, '/api/baleines/<int:baleine_id>')
api.add_resource(MediaResource, '/api/baleines/<int:baleine_id>/media') 

if __name__ == '__main__':
    app.run(debug=True)