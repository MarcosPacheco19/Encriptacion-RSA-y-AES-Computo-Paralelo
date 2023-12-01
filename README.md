# Encriptacion-RSA-y-AES-Computo-Paralelo
En este proyecto tenemos realizado un  back-end en flask, con kernels en pyduca para la encriptacion y desencriptacion de los algoritmos AES y RSA, ademas de un front-end en angular para consumir los endpoints respectivos

## Estructura del Proyecto
- **Backend (Flask)**
  - Directorio `app`
    - Subdirectorio `Encriptacion_PyCuda`
      - `Encriptacion_AES.py`
      - `Encriptacion_RSA.py`
    - `__init__.py`
    - `routes.py`
  - `main.py`
  - `requirements.txt`
  - `Dockerfile`
- **Frontend (Angular)**
   - Directorio `app`
    - Subdirectorio `src`
      - Subdirectorio `services`
      - Subdirectorio `pages`
      - Subdirectorio `components`
    - `Dockerfile`
## Requisitos
- Docker
- docker-compose
- angular-cli
- python
- libreria de cuda version 12.2.0

## Instalación y Ejecución

### Clonar el Repositorio
```bash
git clone https://github.com/MarcosPacheco19/Encriptacion-RSA-y-AES-Computo-Paralelo.git
```
#### Ejecución de backend en flask
```bash
cd Encriptacion-Backend-api
python main.py
```
#### Ejecución de frontend en angular
```bash
cd Encriptacion-Frontend-web
ng serve --o
```
#### Ejecución de docker-compose
```bash
docker-compose up
```
## Uso del API
#### Encriptación AES
##### Encriptar (POST): /encriptar/aes

Recibe un archivo de texto, lo encripta utilizando Encriptacion_AES.encriptar(), y devuelve el texto encriptado en base64 como respuesta JSON.
##### Desencriptar (POST): /desencriptar/aes

Recibe un archivo con texto encriptado en formato base64, lo decodifica y lo desencripta utilizando Encriptacion_AES.desencriptar(), y devuelve el resultado como respuesta JSON.
#### Encriptación RSA
##### Encriptar (POST): /encriptar/rsa
Recibe un archivo con texto en formato UTF-8, lo encripta utilizando Encriptacion_RSA.encriptar(), y devuelve una lista de enteros que representa el texto cifrado como respuesta JSON.
##### Desencriptar (POST): /desencriptar/rsa

Encriptacion_RSA.desencriptar(), y devuelve el resultado como respuesta JSON.
#### Descarga de Archivos
##### Descargar (POST): /descargar/texto
Recibe una solicitud para descargar archivos de texto en formato .txt, extrae el texto y el nombre del archivo del cuerpo JSON, y devuelve el archivo para su descarga.
