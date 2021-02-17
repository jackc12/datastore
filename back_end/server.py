import flask, pickle, pandas as pd

csv_path, pickle_path = '../data/Future50.csv', '../data/data.pickle'

with open('data', 'wb') as f:
    pickle.dump(pd.read_csv(csv_path), f)

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def get_all():
    with open(pickle_path, 'rb') as f:
        data = pickle.load(f).to_json(orient='columns')
    res = flask.jsonify(data)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

@app.route('/<int:col>/<int:row>', methods=['POST'])
def update_values(col, row):
    with open(pickle_path, 'rb') as f:
        data = pickle.load(f).to_dict()
    res = flask.jsonify('updated')
    key = list(data.keys())[col]
    if key in data.keys():
        if row in data[key]:
            data[key][row] = flask.request.data.decode()[1:-1]
            with open(pickle_path, 'wb') as f:
                pickle.dump(pd.DataFrame(data), f)
            res = flask.jsonify('updated')
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

@app.route('/reset', methods=['GET'])
def reset():
    with open(pickle_path, 'wb') as f:
        pickle.dump(pd.read_csv(csv_path), f)
    res = flask.jsonify('reset')
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

if __name__ == '__main__':
	app.run('127.0.0.1', 5000)
