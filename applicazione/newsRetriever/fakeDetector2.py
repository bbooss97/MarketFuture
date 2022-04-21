
import requests
import json
import time
import random
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
print("fakedetector avviato")
#cambia lo sleep a 20
time.sleep(20)
data = pd.read_csv("news.csv")

x = np.array(data["title"])
y = np.array(data["label"])
cv = CountVectorizer()
x = cv.fit_transform(x)
xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=0.2, random_state=42)
model = MultinomialNB()
model.fit(xtrain, ytrain)

#predict("""CBS On Biden COVID Crisis “COVID Anxiety Spiking As COVID Surges Everywhere At Astonishing Speed""")



def predict(news_headline):
    data = cv.transform([news_headline]).toarray()
    # print(news_headline)
    return model.predict(data)

def prendiArticoli(n):
    argomento="business"
    site3="http://api.mediastack.com/v1/news?categories="+argomento+"&access_key=61a7781d16ba61e387e61c0c9b8f9418&limit=100&languages=en"
    #site3="http://api.mediastack.com/v1/news?keywords="+argomento+"&access_key=61a7781d16ba61e387e61c0c9b8f9418&limit=100&languages=en"
    response=requests.get(site3)
    #response = requests.get("http://localhost:3000/news?argomento=covid")
    articoli= json.loads(response.text)["data"]
    titoli=[i["title"]for i in articoli]
    primi=[]
    conta=0
    # for i in titoli:
    #     if conta>n-1:
    #         break
    #     if predict(i).item()=="REAL":
    #         primi.append(i)
    #         conta+=1
    # return primi
    random.shuffle(articoli)
    for i in articoli:
        if conta>n-1:
            break
        if predict(i["title"]).item()=="REAL":
            primi.append(i)
            conta+=1
    return primi



while(True):
    primiarticoli=prendiArticoli(10)
    primiarticoli={"articoli":primiarticoli}
    print(primiarticoli)
    
    richiesta=requests.post("http://localhost:3000/news",json=primiarticoli)
    print(richiesta.text)
    time.sleep(60)


# primiarticoli=prendiArticoli(10)
# print(primiarticoli)
# print(len(primiarticoli))



# query = {'lat':'45', 'lon':'180'}
# response = requests.get('http://api.open-notify.org/iss-pass.json', params=query)
# print(response.json())

















































































































































