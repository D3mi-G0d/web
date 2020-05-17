import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

batch = db.batch()

import csv
import os

dmc = open("hashes/dmc_hash.txt").read().replace(' ', '').split('\n')
hl = open("hashes/hl_hash.txt").read().replace(' ', '').split('\n')
minecraft = open("hashes/minecraft_hash.txt").read().replace(' ', '').split('\n')
nfs = open("hashes/nfs_hash.txt").read().replace(' ', '').split('\n')
tetris = open("hashes/tetris_hash.txt").read().replace(' ', '').split('\n')

i = 0
with open('account_file.csv') as csvfile:
	readCSV = csv.reader(csvfile, delimiter=',')
	for row in readCSV:
		candidate = db.collection(u'participants').document(row[0])
		batch.set(candidate,{u'username' : row[5], u'score': 0, u'output': {u'dmc': dmc[i], u'hl': hl[i], u'minecraft': minecraft[i], u'nfs': nfs[i], u'tetris': tetris[i]}})
		i = i + 1
		print(i)

batch.commit()


