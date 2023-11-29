from flask import Blueprint, request, jsonify, send_file, make_response
from .Encriptacion_PyCuda import Encriptacion_RSA
from io import BytesIO

main = Blueprint('main', __name__)
main.register_blueprint(main, url_prefix="/api")

@main.route('/encriptar/rsa', methods=['POST'])
def encriptar_rsa():
    file = request.files['file']
    texto = file.read().decode('utf-8')
    texto_encriptado = Encriptacion_RSA.encriptar(texto)
    
    return jsonify({"texto_encriptado": texto_encriptado})

@main.route('/desencriptar/rsa', methods=['POST'])
def desencriptar_rsa():
    file = request.files['file']
    texto_encriptado_str = file.read().decode('utf-8')
    texto_encriptado = list(map(int, texto_encriptado_str.split()))

    texto_desencriptado = Encriptacion_RSA.desencriptar(texto_encriptado)
    return jsonify({"texto_desencriptado": texto_desencriptado})