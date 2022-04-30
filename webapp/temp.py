import mysql.connector
mydb = mysql.connector.connect(
    host="localhost",
    user="myuser",
    password="mypassword",
    database="mydb"
    #  auth_plugin='mysql_native_password'
)
print(mydb)