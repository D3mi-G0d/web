import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)


while(1):
	uid = input("UID : ")
	user = auth.get_user(uid)
	print(user.email)
	verified = user.email_verified
	print(user.email + " Email Verified : "+ str(verified))
	if(verified==False):
		auth.update_user(uid, email_verified = True)
