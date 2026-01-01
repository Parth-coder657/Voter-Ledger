from flask import Flask, request, jsonify
import pandas as pd
from fuzzywuzzy import fuzz
import io

app = Flask(__name__)

def check_duplicates(voter_a, voter_b):
    score = fuzz.token_sort_ratio(voter_a['name'], voter_b['name'])
    return score > 85 and voter_a['dob'] == voter_b['dob']

@app.route('/dedupe', methods=['POST'])
def dedupe():
    file = request.files['file']
    df = pd.read_csv(io.StringIO(file.stream.read().decode("UTF8")))
    flagged = []

    for i in range(len(df)):
        for j in range(i + 1, len(df)):
            if check_duplicates(df.iloc[i], df.iloc[j]):
                flagged.append((i, j))

    return jsonify({'duplicates': flagged})

if __name__ == '__main__':
    app.run(debug=True)