import pickle, pandas as pd


data = pd.read_csv('../data/archive/Future50.csv').head(n=3)

data['Rank'] =[0,0,0]

with open('data', 'wb') as f:
    pickle.dump(data, f)

with open('data', 'rb') as f:
	c = pickle.load(f)

print(c)