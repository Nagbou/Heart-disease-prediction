@echo off
cd /d C:\Users\MAHMOUD\Desktop\data_minig\heart_disease_pred\my_flask_app
call venv\Scripts\activate
start python app.py
timeout /t 5 /nobreak
start http://127.0.0.1:5000