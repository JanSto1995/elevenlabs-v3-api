from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return 'OK', 200

@app.route('/run', methods=['POST'])
def run_script():
    my_text = request.json.get('text', 'No Text Received')
    print(f"Running with text: {my_text}")

    # Pass dynamic text to your Node.js script
    subprocess.run(["node", "index.js", my_text])

    return {'status': 'ok', 'received_text': my_text}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
