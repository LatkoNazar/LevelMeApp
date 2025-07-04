import pandas as pd

dataset = pd.read_csv("all_recipes.csv", nrows=1000)
print(dataset.iloc[0,0])