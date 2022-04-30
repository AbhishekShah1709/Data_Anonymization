import mysql.connector
from ast import Not
from fileinput import filename
from operator import index
from pyparsing import col
from torch import int64
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from flask import Flask, render_template, request
import csv
from tempfile import NamedTemporaryFile
import shutil
import io
import pandas as pd
import numpy as np
from io import StringIO
import random
from flask import send_file
import os
import hashlib
import json
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype
from flask_cors import CORS, cross_origin
import tempfile
import time
# app = Flask(_name_)


app = Flask(__name__)
CORS(app)

IP_Database = {}

#import mysql.connector

#mydb = mysql.connector.connect(
#   host="localhost",
#   user="myuser",
#   password="mypassword",
#   database="mydb"
#   #  auth_plugin='mysql_native_password'
#)
# cursor = mydb.cursor()
# databases = ("show databases")
# cursor.execute(databases)
# for databases in cursor:
#      print(databases[0])


# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM userdata")


@app.route('/')
def starter():
    return 'Please go to <a href="http://localhost:5000/upload">Upload File page </a> route'


@app.route('/upload')
def uploadPage():
    return render_template('upload.html')


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file1():
    if request.method == 'POST':
        print(request)
        stream = io.StringIO(
            request.files['myFile'].read().decode("UTF8"), newline=None)
        df = pd.read_csv(stream, sep=",")
        IP_Database[request.remote_addr] = {}
        IP_Database[request.remote_addr]['dataset'] = df
        return 'file uploaded successfully'


@app.route('/uploadPolicy', methods=['GET', 'POST'])
def upload_policy2():
    if request.method == 'POST':
        print(request.data)
        value = request.data.decode('utf-8')
        policy = json.loads(value)['selectedPolicy']
        if (IP_Database.get(request.remote_addr) == None):
            IP_Database[request.remote_addr] = {}
        IP_Database[request.remote_addr]['policy'] = policy
        ret = updateDataset(
            IP_Database[request.remote_addr]['dataset'], policy, request.remote_addr)
        # IP_Database[request.remote_addr]['changed_dataset']=changed_dataset
        return ret


@app.route('/uploadPolicy2', methods=['GET', 'POST'])
def upload_policy():
    if request.method == 'POST':
        policy = json.loads(request.files['myFile'].read().decode("UTF8"))[
            'selectedPolicy']
        if (IP_Database.get(request.remote_addr) == 'None'):
            IP_Database[request.remote_addr] = {}
        IP_Database[request.remote_addr]['policy'] = policy
        ret = updateDataset(
            IP_Database[request.remote_addr]['dataset'], policy, request.remote_addr)
        # IP_Database[request.remote_addr]['changed_dataset']=changed_dataset
        return ret

# @app.route('/uploadPolicy', methods = ['GET', 'POST'])
# def upload_policy2():
#   if request.method == 'POST':
#      print(request.data)
#      value=request.data.decode('utf-8')
#      policy=json.loads(value)['selectedPolicy']
#      if (IP_Database.get(request.remote_addr)==None):
#         IP_Database[request.remote_addr]={}
#      IP_Database[request.remote_addr]['policy']=policy
#      changed_dataset=updateDataset(IP_Database[request.remote_addr]['dataset'],policy)
#      IP_Database[request.remote_addr]['changed_dataset']=changed_dataset
#      return 'file uploaded successfully'
#
# @app.route('/uploadPolicy2', methods = ['GET', 'POST'])
# def upload_policy():
#   if request.method == 'POST':
#      policy=json.loads(request.files['myFile'].read().decode("UTF8"))['selectedPolicy']
#      if (IP_Database.get(request.remote_addr)=='None'):
#         IP_Database[request.remote_addr]={}
#      IP_Database[request.remote_addr]['policy']=policy
#      changed_dataset=updateDataset(IP_Database[request.remote_addr]['dataset'],policy)
#      IP_Database[request.remote_addr]['changed_dataset']=changed_dataset
#      return 'file uploaded successfully'
#


@app.route('/anontool', methods=['GET', 'POST'])
def anontool():
   #  if (IP_Database.get(request.remote_addr) == None):
    IP_Database[request.remote_addr] = {}
    IP_Database[request.remote_addr]['anon'] = True
    f = request.files['myFile']
    f.save(os.path.join("./anonimatron-1.15/", 'config.xml'))
    os.popen('bash ./anonimatron-1.15/anonimatron.sh -config config.xml',
             mode='r', buffering=-1)

    return 'config uploaded successfully'


@app.route('/download')
def downloadFile():
    dataset = IP_Database[request.remote_addr]['changed_dataset']
    # with tempfile.NamedTemporaryFile(mode='w+b', delete=False) as temp:
    with open('savefile2.csv', 'w') as f:
        dataset.to_csv(f.name)
    return send_file('../savefile2.csv', as_attachment=True, attachment_filename='savefile2.csv')


def updateDataset(dataset, policy, remote_addr):
    changed_dataset = dataset
    flag = 0
    for column, method in policy.items():
        if(column not in changed_dataset.columns):
            flag = 1
            break
        if 'Data Masking' in method:
            for i in range(len(dataset)):
                changed_dataset.at[i, column] = changed_dataset.at[i, column][0:len(
                    changed_dataset.at[i, column])-4]+"****"

        if 'Data perturbation' in method:
            if is_numeric_dtype(dataset[column]):
                std = changed_dataset[column].std()
                for i in range(len(dataset)):
                    changed_dataset.at[i, column] = dataset.at[i, column]+std

        if 'Data Pseudonymization' in method:
            if is_string_dtype(dataset[column]):
                dic = {}
                nuni = dataset[column].nunique()
                idxs=np.arange(nuni)
                random.shuffle(idxs)
                cnt=0
                for i in range(len(dataset)):
                  if (dic.get(dataset.at[i, column])):
                     continue
                  else:
                     dic[dataset.at[i, column]] = str(column)+"_"+str(idxs[cnt])
                     cnt+=1
            
                for i in range(len(dataset)):
                    changed_dataset.at[i, column] = dic[dataset.at[i, column]]
            else:
                flag = 1

        if 'Generalization' in method:
            key = column
            datatype = ""
            if is_numeric_dtype(dataset[key]):
                datatype = "Numeric"
                for i in range(len(dataset)):
                    if (changed_dataset.at[i, column]-5 == 0):
                        continue
                    elif (changed_dataset.at[i, column] % 10-5 < 0):
                        changed_dataset.at[i, column] = changed_dataset.at[i,
                                                                           column]+5-(changed_dataset.at[i, column] % 10)
                    elif (changed_dataset.at[i, column] % 10-5 > 0):
                        changed_dataset.at[i, column] = changed_dataset.at[i,
                                                                           column]-(changed_dataset.at[i, column] % 10)+5
            elif is_string_dtype(dataset[key]):
                datatype = "String"
                for i in range(len(dataset)):
                    changed_dataset.at[i,
                                       column] = changed_dataset.at[i, column][0:4]

        if 'Data swapping' in method:
            entries = len(dataset)
            idxs = np.random.choice(np.arange(entries), entries, replace=False)
            for i in range(len(dataset)):
                changed_dataset.at[i,
                                   column] = changed_dataset.at[idxs[i], column]

        if 'Drop' in method:
            changed_dataset=changed_dataset.drop([column], axis=1)
        if 'None' in method:
            continue
    if (flag == 1):
        return '1'
    IP_Database[remote_addr]['changed_dataset'] = changed_dataset
    return '0'

def isKAnonymized(df, k):
    for index, row in df.iterrows():
         query=''
         # query = ' & '.join([f'{col} == \"{row[col]}\"' for col in df.columns])
         for col in df.columns:
            if(is_numeric_dtype(df[col])):
               query+=f'{col} == {row[col]} & '
            else:
               query+=f'{col} == \"{row[col]}\" & '
         rows = df.query(query[0:len(query)-2])
         if rows.shape[0] < k:
               return False
    return True

@app.route('/getPreview', methods=['GET', 'POST'])
def preview():
    previewData = {
        "data": [],
        "anon": False,
        "kAnon":0
    }
    if (IP_Database.get(request.remote_addr) == None):
        return json.dumps('')
    else:
        if(IP_Database[request.remote_addr].get('anon') == True):
            time.sleep(2)
            mydb = mysql.connector.connect(
                host="localhost",
                user="myuser",
                password="mypassword",
                database="mydb"
                #  auth_plugin='mysql_native_password'
            )
            # cursor = mydb.cursor()
            # databases = ("show databases")
            # cursor.execute(databases)
            # for databases in cursor:
            #      print(databases[0])


            # mycursor = mydb.cursor()
            mycursor = mydb.cursor()
            mycursor.execute("SELECT * FROM userdata")
            myresult=[]
            myresult = mycursor.fetchall()
            print(myresult)
            for x in myresult:
                dic = {}
                i = 0
                for k in x:
                    dic[str(i)] = str(k)
                    i+=1
                previewData['data'].append(dic)
            previewData['anon']=True
            df=pd.DataFrame(np.array(myresult))
            cols=[]
            for i in range(len(df.columns)):
               cols.append("Column_"+str(i))
            df.columns = cols
            IP_Database[request.remote_addr]['changed_dataset']=df
            changed_dataset = IP_Database[request.remote_addr]['changed_dataset']
            currK=1
            for i in range(len(changed_dataset)):
               if (isKAnonymized(changed_dataset,i)==True):
                  currK=i
            previewData['kAnon']=currK
            returnData = previewData
            return json.dumps(returnData)
    if isinstance(IP_Database[request.remote_addr].get('changed_dataset'), pd.DataFrame) == False:
        return json.dumps('')
    changed_dataset = IP_Database[request.remote_addr]['changed_dataset']
    currK=1
    for i in range(len(changed_dataset)):
       if (isKAnonymized(changed_dataset,i)==True):
         currK=i
    previewData['kAnon']=currK
    for i in range(len(changed_dataset)):
        dic = {}
        for key in changed_dataset.keys():
            dic[key] = str(changed_dataset.loc[i, key])
        previewData['data'].append(dic)
    returnData = previewData

    return json.dumps(returnData)


@app.route('/dataType', methods=['GET', 'POST'])
def dataType():
    dataset = IP_Database[request.remote_addr]['dataset']
    dataTypeList = []
    for key in dataset:
        datatype = ""
        if dataset[key].dtypes.name == 'bool':
            datatype = "Bool"
        elif is_numeric_dtype(dataset[key]):
            datatype = "Numeric"
        elif is_string_dtype(dataset[key]):
            datatype = "String"
        dataTypeList.append({'Name': key, "type": datatype})
    returnData = {'data': dataTypeList}
    return json.dumps(returnData)


@app.route('/uploadDataset', methods=['GET', 'POST'])
# DATA MASKING
def upload_file2():
    if request.method == 'POST':
        f = request.files['File']
        stream = io.StringIO(f.read().decode("UTF8"), newline=None)
        reader = csv.reader(stream)
        final_string = ""
        with open(NamedTemporaryFile(delete=True).name, 'a+') as fake_csv:
            writer = csv.writer(fake_csv)
            index = [0]
            i = 0
            df = pd.read_csv(stream)
            for row in reader:
                if i != 0:
                    for curindex in index:
                        row[curindex] = row[curindex][0:len(
                            row[curindex])-4]+"**"
                writer.writerow(row)
                i += 1
            fake_csv.flush()
            fake_csv.seek(0)
            final_string = ''.join([line for line in fake_csv.readlines()])
            print(final_string)
            fake_csv.close()
        return final_string


# DATA SWAPPING
def upload_file3():

    if request.method == 'POST':
        f = request.files['File']
        stream = io.StringIO(f.read().decode("UTF8"), newline=None)
        reader = csv.reader(stream)
        final_string = ""
        with open(NamedTemporaryFile(delete=True).name, 'a+') as fake_csv:
            writer = csv.writer(fake_csv)
            index = [0]
            i = 0
            df = pd.read_csv(stream)
            stored = []

            for row in reader:
                if i != 0:
                    for curindex in index:
                        stored.append(row[curindex])
                i += 1
            entries = len(stored)
            idxs = np.random.choice(np.arange(entries), entries, replace=False)

            for row in reader:
                if i != 0:
                    for curindex in index:
                        row[curindex] = stored[idxs[i-1]]

                writer.writerow(row)
                i += 1
            fake_csv.flush()
            fake_csv.seek(0)
            final_string = ''.join([line for line in fake_csv.readlines()])
            print(final_string)
            fake_csv.close()
        return final_string

# DATA Psedonymization


def upload_file4():
    if request.method == 'POST':
        f = request.files['File']
        stream = io.StringIO(f.read().decode("UTF8"), newline=None)
        reader = csv.reader(stream)
        final_string = ""
        with open(NamedTemporaryFile(delete=True).name, 'a+') as fake_csv:
            writer = csv.writer(fake_csv)
            index = [0]
            i = 0
            df = pd.read_csv(stream)
            entries = df.shape[0]-1

           # GET PSEUDOMANES IN lst VARIABLE
            # result = hashlib.sha256(str.encode())
            # print(result.hexdigest())
            idxs = np.random.choice(np.arange(len(lst)), entries)

            for row in reader:
                if i != 0:
                    for curindex in index:
                        # GET NOISE RANGE IN noise ARRAY
                        row[curindex] = lst[idxs[i-1]]
                writer.writerow(row)
                i += 1
            fake_csv.flush()
            fake_csv.seek(0)
            final_string = ''.join([line for line in fake_csv.readlines()])
            print(final_string)
            fake_csv.close()
        return final_string

# DATA Pertubation


def upload_file4():
    if request.method == 'POST':
        f = request.files['File']
        stream = io.StringIO(f.read().decode("UTF8"), newline=None)
        reader = csv.reader(stream)
        final_string = ""
        with open(NamedTemporaryFile(delete=True).name, 'a+') as fake_csv:
            writer = csv.writer(fake_csv)
            index = [0]
            i = 0
            df = pd.read_csv(stream)
            for row in reader:
                if i != 0:
                    for curindex in index:
                        # GET NOISE RANGE IN noise ARRAY
                        row[curindex] = row[curindex] + \
                            random.uniform(noise[0], noise[1], 1)
                writer.writerow(row)
                i += 1
            fake_csv.flush()
            fake_csv.seek(0)
            final_string = ''.join([line for line in fake_csv.readlines()])
            print(final_string)
            fake_csv.close()
        return final_string


if __name__ == '__main__':
    app.run()
