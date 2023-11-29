from flask import Blueprint, request, jsonify
from .Encriptacion_PyCuda import Encriptacion_RSA, Encriptacion_AES
from io import BytesIO
import base64

main = Blueprint('main', __name__)

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

@main.route('/encriptar/aes', methods=['POST'])
def encriptar_aes():
    file = request.files['file']
    texto = file.read().decode('utf-8')
    texto_encriptado = Encriptacion_AES.encriptar(texto)
    
    texto_encriptado_b64 = base64.b64encode(texto_encriptado).decode('utf-8')
    return jsonify({"texto_encriptado": texto_encriptado_b64})

@main.route('/desencriptar/aes', methods=['POST'])
def desencriptar_aes():
    file = request.files['file']
    texto_encriptado_b64 = file.read().decode('utf-8')
    
    texto_encriptado = base64.b64decode(texto_encriptado_b64)
    
    texto_desencriptado = Encriptacion_AES.desencriptar(texto_encriptado)
    return jsonify({"texto_desencriptado": texto_desencriptado})