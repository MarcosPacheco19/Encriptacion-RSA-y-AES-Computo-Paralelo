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
#### Ejecución de backend en flask
cd Encriptacion-Backend-api
