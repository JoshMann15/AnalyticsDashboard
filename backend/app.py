from flask import Flask, jsonify, request
from api import get_bitcoin_data, get_exchange_data, get_melbourne_humidity_data

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return response


@app.errorhandler(Exception)
def handle_exception(e):
    response = jsonify({"error": str(e)})
    response.status_code = 500
    return add_cors_headers(response)

@app.route('/api/data/bitcoin', methods=['GET', 'OPTIONS'])
def bitcoin_data():
    if request.method == "OPTIONS":
        return "", 200
    data = get_bitcoin_data()
    return jsonify(data)

@app.route('/api/data/exchange', methods=['GET', 'OPTIONS'])
def exchange_data():
    if request.method == "OPTIONS":
        return "", 200
    data = get_exchange_data()
    return jsonify(data)


@app.route('/api/data/humidity', methods=['GET', 'OPTIONS'])
def humidity_data():
    if request.method == "OPTIONS":
        return "", 200
    return jsonify(get_melbourne_humidity_data())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
