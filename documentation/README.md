# Data anonymization
This tool provides two options for data-anonymization, the first is our own model and the second is integrated-Anonymatron using which one can anonymize the data sitting on a database.

## Initial set-up:
* Clone the repository.
* install all the python dependencies mentioned below.
* run python3 webapp/webapp.py to start the backend.
* go to frontend/my-app/
* run npm start
## Requirements:
```
-> python3 requirements are:
-> mysql.connector,csv,shutil,io,pandas as pd,numpy as np,random,os,hashlib,json,tempfile,time,ast ,fileinput,operator ,pyparsing,werkzeug,flask ,pandas.api.types ,pandas.api.types ,flask_cors ,flask ,io ,tempfile
-> Run pip3 install [dependency] to install them.
```
## To run our implementation:
* Open localhost:3000/home
* Here select whether you want to use our implementation or the Anonymatron tool
### Anonymatron
* If selected Anonymatron, than you would be redirected to the Anonymatron home page.
* Here upload the XML file as described in the [link](https://realrolfje.github.io/anonimatron/documentation/#quick-start)
* Then you would be redirected to the preview page.
### Our Anonymization tool
* If you selected our implementation, then you would be redirected to our home page.
* Here upload the dataset you would like to anonymize.
* Then select whether you want to upload the policy json or select policy manually.
* If you want to upload JSON file, that the format should be where key is column name and value is what ever policy you want to apply from ['Data Masking','Data perturbation','Data Pseudonymization','Generalization','Data swapping','Drop','None']
* If you selected the select policy manually option, that select which ever policy you would want for each column.
* Once you submit the policy you would be redirected to the preview page.
### Preview page
* In this page you would be able to see the anonymized data.
* If you want to download the data click on download data button