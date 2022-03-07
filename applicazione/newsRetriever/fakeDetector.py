import requests
import json

import pandas as pd
import numpy as np
import itertools
from sklearn import metrics
from sklearn.model_selection import train_test_split
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.feature_extraction.text import TfidfVectorizer



def prendiArticoli():
    response = requests.get("http://localhost:3000/news?argomento=covid")
    articoli= json.loads(response.text)["results"]
    print(len(articoli))
    print(articoli[0].keys())
    return articoli

def predict(articolo):
    X_test_vec = vectorizer.transform(articolo)
    y_pred=model.predict(X_test_vec)
    print(y_pred.item())


df = pd.read_csv("./news.csv")
df['Unnamed: 0'].nunique()
df = df.drop('Unnamed: 0', axis = 1)
df.isnull().sum()
df['label'].value_counts()
X = df['text']
y = df['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=22)
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

model=PassiveAggressiveClassifier(max_iter=70)
model.fit(X_train_vec, y_train)

# Predict on the test set
y_pred=model.predict(X_test_vec)

# calculate accuracy of the model
score=metrics.accuracy_score(y_test,y_pred)
print(f'Accuracy: {round(score*100,2)}%')

metrics.confusion_matrix(y_pred, y_test, labels=['REAL', 'FAKE'])

articoli=prendiArticoli()[1]
print(articoli)
predict(["""A total of 431 new COVID-19 cases (209 males and 222 females) were recorded by the Best-dos Santos Public Health Laboratory on Friday, February 11, from the 2,013 tests conducted. The positive cases consist of 83 persons under the age of 18, and 348 who are 18 years and older. The number of people in [&#8230;]The post COVID-19 Update: 431 new COVID cases appeared first on Barbados Today."""])
#predict([articoli["full_description"]])





















































































































































