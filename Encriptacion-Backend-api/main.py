from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/encriptar/rsa', methods=['POST'])
def ecncriptacion_rsa():
    pass
if __name__ == "__main__":
    app.run(debug=True)