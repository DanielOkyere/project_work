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
import uuid
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
    """Dashboard Page"""
    return render_template('dashboard.html')

@app.route('/products', methods=['GET'])
def products():
    """Products Page"""
    return render_template('products.html')

@app.route('/productCategories', methods=['GET'])
def productCategories():
    """Products Categories Page"""
    return render_template('productCategories.html')

@app.route('/purchaseOrders', methods=['GET'])
def purchaseOrders():
    """Purchase Orders Page"""
    return render_template('purchaseOrders.html')

@app.route('/suppliers', methods=['GET'])
def suppliers():
    """Suppliers Page"""
    return render_template('suppliers.html')

@app.route('/transactions', methods=['GET'])
def transactions():
    """Transactions Page"""
    return render_template('transactions.html')

@app.route('/employees', methods=['GET'])
def employeePage():
    """Employee Page"""
    return render_template('employees.html')

@app.route('/activities', methods=['GET'])
def activities():
    """Activities Page"""
    return render_template('activities.html')

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
            # employeeNo=uuid.uuid4(),
            employeeName=new_employees.get('name'),
            employeeEmail=new_employees.get('email')
            ))
        session.commit()
        return jsonify(new_employees)

    


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)