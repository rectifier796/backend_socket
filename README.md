# backend_socket
Steps to run : 
1. npm install
2. Update mongodb url in index.js file to connect with your database.
3. npm start

Packages Used : 
1. express
2. body-parser
3. cors
4. dotenv
5. mongoose
6. multer
7. path
8. socket.io
9. nodemon

API Created : 
1. get("/user/getUsers") : to get all user's data.
2. post("/user/addUser") : to add user.
          Input format : form-data containing fields as name(String,required), phone(String,required), email(String,unique,required), image(Only One image is allowed)
3. put("/user/updateUser") : to update a user.
          Input format : form-data containing fields as user_id(ObjectId,required), name(String,required), phone(String,required), email(String,unique,required), image(Only One image is allowed)
![image](https://github.com/rectifier796/backend_socket/assets/108865347/112b83a8-e0c4-4cb5-a351-e77627c6611e)
![image](https://github.com/rectifier796/backend_socket/assets/108865347/432ba5df-ae04-4d85-b1a7-a88f5b9f2ec0)
