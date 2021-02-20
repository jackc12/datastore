import flask, pickle, pandas as pd

csv_path, data_pickle_path, edited_table_entries_path = '../data/Future50.csv', '../data/data.pickle', '../data/edited_table_entries.pickle'

with open(data_pickle_path, 'wb') as data_f, open(edited_table_entries_path, 'wb') as edited_table_entries_f:
    pickle.dump(pd.read_csv(csv_path), data_f)
    pickle.dump([], edited_table_entries_f)

app = flask.Flask(__name__)

@app.route('/get_table_data', methods=['GET'])
def get_table_data():
    with open(data_pickle_path, 'rb') as data_f:
        data = pickle.load(data_f).to_json(orient='columns')
    res = flask.jsonify(data)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

@app.route('/post_edited_table_entries/<int:row>/<int:col>', methods=['POST'])
def update_values(row, col):
    with open(data_pickle_path, 'rb') as data_f, open(edited_table_entries_path, 'rb') as edited_table_entries_f:
        data = pickle.load(data_f).to_dict()
        edited_table_entries = pickle.load(edited_table_entries_f)
    res = flask.jsonify(edited_table_entries)
    key = list(data.keys())[col]
    if key in data.keys():
        if row in data[key]:
            data[key][row] = flask.request.data.decode()[1:-1]
            with open(data_pickle_path, 'wb') as f:
                pickle.dump(pd.DataFrame(data), f)
            if [row, col] not in edited_table_entries:
                edited_table_entries.append([row, col])
                with open(edited_table_entries_path, 'wb') as f:
                    pickle.dump(edited_table_entries ,f)
            res = flask.jsonify(edited_table_entries)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


@app.route('/original_dataset', methods=['GET'])
def reset():
    with open(data_pickle_path, 'wb') as data_f, open(edited_table_entries_path, 'wb') as edited_table_entries_f:
        pickle.dump(pd.read_csv(csv_path), data_f)
        pickle.dump([], edited_table_entries_f)
    res = flask.jsonify('original dataset')
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

@app.route('/get_edited_table_entries', methods=['GET'])
def edited_entries():
    with open(edited_table_entries_path, 'rb') as edited_table_entries_f:
        edited = pickle.load(edited_table_entries_f)
    res = flask.jsonify(edited)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


if __name__ == '__main__':
	app.run('127.0.0.1', 5000)
