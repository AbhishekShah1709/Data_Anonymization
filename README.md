# Data anonymization
This tool provides two options for data-anonymization, the first is our own model and the second is integrated-Anonymatron using which one can anonymize the data sitting on a database.

## Initial set-up:
* Clone the repository.
* Install all the python dependencies mentioned below.
* Run python3 webapp/webapp.py to start the backend.
* Go to frontend/my-app/
* Run npm start
## Requirements:
```
pip install -r requirements.txt
Run the above command to install all Python dependencies.
```
## To run our implementation:
* Open localhost:3000/home
* Select the implementation you want to use out of the following options:
 1) Anonymatron 
 2) My Tool

### Anonymatron
* For anonymatron part, upload the XML file as described in the [link](https://realrolfje.github.io/anonimatron/documentation/#quick-start)
* You would be redirected to the preview page and you will have an option to download the selected file.

### My Tool
* My tool supports the following anonymization policies:
-> Data Masking
-> Data perturbation
-> Data Pseudonymization
-> Generalization
-> Data swapping
-> Drop
-> None

* For my tool, upload the dataset you would like to anonymize.
* You have the option to provide policy by either uploading a JSON file or by entering them manually. 
* The format of the JSON file should be as follows:
1) The key should be the column name, and 
2) The value should be the policy you want to apply on that column.
* For manual selection part, you will have a dropdown consisting of policies for each column. Select the policy you want to apply on that column.
* On submitting the policy you will be previewed with the anonymized data.
* You will also have an option to download the anonymized data.
