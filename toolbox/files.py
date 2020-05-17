import csv
import os

i = 1
with open('account_file.csv') as csvfile:
	readCSV = csv.reader(csvfile, delimiter=',')
	for row in readCSV:
		print(row[0])
		os.rename('tetris/'+str(i)+'.txt','tetris/'+row[0]+'.txt')
		i = i + 1