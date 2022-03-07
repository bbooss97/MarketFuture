import requests
import json

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB


def prendiArticoli():
    response = requests.get("http://localhost:3000/news?argomento=covid")
    articoli= json.loads(response.text)["results"]
    print(len(articoli))
    print(articoli[0].keys())
    return articoli

def predict(news_headline):
    data = cv.transform([news_headline]).toarray()
    print(news_headline)
    print(model.predict(data))


data = pd.read_csv("news.csv")

x = np.array(data["title"])
y = np.array(data["label"])
cv = CountVectorizer()
x = cv.fit_transform(x)
xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=0.2, random_state=42)
model = MultinomialNB()
model.fit(xtrain, ytrain)

predict("""Welfare Dept ready to step in if floods worsen, says minister""")















































































































































