#!/usr/bin/env python3
"""App an routes"""
from flask import (Flask,
                   jsonify,
                   abort,
                   redirect)
from flask import render_template, request
from flask_cors import CORS
from models import Employee, Product
from db import DB
import json
from models import all_triggers, select_product

app = Flask(__name__)
CORS(app)

db = DB()


@app.route('/', methods=['GET'])
def home():
    """Base for Website"""
    return render_template('home.html')


# Employee Route
@app.route('/employee', methods=['GET', 'POST'])
def employee():
    """Employee"""
    if request.method == 'GET':
        employees = db.get_employee()
        data = [{"name": employee.employeeName, "employeeNo": employee.employeeNo} for employee in employees]
        return jsonify({"message": "employees Retrieved", "data": data})
    elif request.method == 'POST':
        new_employees = request.json
        print(new_employees)
        db.add_employee(employeeName=new_employees.get('employeeName'),
                        employeeEmail=new_employees.get('employeeEmail'))
        return jsonify(new_employees)


# Product Routes
@app.route('/product', methods=['GET', 'POST'])
def product():
    """Product Endpoint"""
    if request.method == 'GET':
        products = db.get_product()
        data = [{"id": products.productNO,
                 "name": product.productName,
                 "serialNo": product.serialNo,
                 "unitPrice": product.unitPrice,
                 "reorderlevel": product.reorderLevel
                 } for prod in products]
        return jsonify({"message": "Product Created Successfully",
                        "data": data
                        })

    if request.method == 'POST':
        body = request.json
        print(body)
        products = db.add_product(
            body
        )
        return jsonify({
            "message": "product added successfully",
            "data": products
        })


# Category Routes
@app.route('/category',
           methods=['GET', 'POST', 'PUT']
           )
def category_route():
    """Category routes"""
    if request.method == 'GET':
        categories = db.get_categories()
        results = [{
            "categoryNo": category.get('categoryNo'),
            "categoryDesc": category.get('categoryDesc'),
            "products": category.get('products')
        } for category in categories]
        return jsonify({
            "message": "catgories retrieved",
            "data": results
        })
    if request.method == 'POST':
        body = request.json
        category = db.add_category(body)
        return jsonify({
            "message": "Category Created",
            "data": category
        })


# Supplier Routes
@app.route('/supplier', methods=['GET', 'POST'])
def supplier_routes():
    """Defines the supplier routes"""
    if request.method == 'GET':
        supplier = db.get_supplier()
        return jsonify({
            "message": "supplier created",
            "data": supplier
        })

    if request.method == 'POST':
        body = request.json
        new_supplier = db.add_supplier(body)
        return jsonify({
            "message": "new supplier",
            "data": new_supplier
        })

# Purchase Order Routes
@app.route('/order', methods=['GET','POST'])
def order_routes():
    """Defines order routes"""
    if request.method == 'GET':
        result = db.get_orders()
        return jsonify({
            "message": "order retrieved",
            "data": result
        })

    if request.method == 'POST':
        new_data = request.json
        result = db.add_orders(new_data)
        return jsonify({
            "message": "created New order",
            "data": result
        })

# Transaction Routes

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
