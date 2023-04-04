#!/usr/bin/env python3
"""App an routes"""
from flask import (Flask,
                   jsonify,
                   abort,
                   redirect)
from flask import render_template,request
from flask_cors import CORS
from models import Employee
from db import DB
import json
from models import employee_trigger, product_triggers
from models import productCategory_trigger, supplier_tr, purchaseOrder_tr, transaction_tr

app = Flask(__name__)
CORS(app)


db = DB()
db._session.connection().execute(employee_trigger)

@app.route('/', methods=['GET'])
def home():
    """Base for Website"""
    return render_template('index.html')

@app.route('/dashboard', methods=['GET'])
def dashboard():
    """Base for Website"""
    return render_template('dashboard.html')

@app.route('/employee', methods=['GET', 'POST'])
def employee():
    """Employee"""
    session = db._session
    if request.method == 'GET':
        employees = session.query(Employee).all()
        data = [{"name": employee.employeeName, "employeeNo":employee.employeeNo} for employee in employees]
        return jsonify({"message":"employees Retrieved", "data": data})
    elif request.method == 'POST':
        new_employees = request.json
        print(new_employees)
        
        session.add(Employee(
            # employeeNo=new_employees.employeeNo,
            employeeName=new_employees.get('employeeName'),
            employeeEmail=new_employees.get('employeeEmail')
            ))
        session.commit()
        return jsonify(new_employees)
    


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)