from flask import Blueprint, request, jsonify
from .Encriptacion_PyCuda import Encriptacion_RSA

main = Blueprint('main', __name__)

@main.route('/encriptar/rsa', methods=['POST'])
def encriptar_rsa():
    data = request.json
    texto = data['texto']
    texto_encriptado = Encriptacion_RSA.encriptar(texto)
    return jsonify({"texto_encriptado": texto_encriptado})

@main.route('/desencriptar/rsa', methods=['POST'])
def desencriptar_rsa():
    data = request.json
    texto_encriptado = data['texto_encriptado']
    texto_desencriptado = Encriptacion_RSA.desencriptar(texto_encriptado)
    return jsonify({"texto_desencriptado": texto_desencriptado})