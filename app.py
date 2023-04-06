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

# Employee Route
@app.route('/employee', methods=['GET', 'POST'])
def employee():
    """Employee"""
    if request.method == 'GET':
        employees = db.get_employee()
        data = [{"name": employee.employeeName, "employeeNo": employee.employeeNo, "email": employee.employeeEmail} for employee in employees]
        return jsonify({"message": "employees Retrieved", "data": data})
    elif request.method == 'POST':
        new_employees = request.json
        print(new_employees)
        db.add_employee(employeeName=new_employees.get('name'),
                        employeeEmail=new_employees.get('email'))
        return jsonify(new_employees)


# Product Routes
@app.route('/product', methods=['GET', 'POST'])
def product():
    """Product Endpoint"""
    if request.method == 'GET':
        products = db.get_product()
        data = [{"id": product.productNo,
                 "name": product.productName,
                 "serialNo": product.serialNo,
                 "unitPrice": product.unitPrice,
                 "quantityOnHand":product.quantityOnHand,
                 "reorderlevel": product.reorderLevel,
                 "reorderQuantity": product.reorderQuantity,
                 "reorderLeadTimeCell": product.reorderLeadTime,
                 "categoryNo": product.categoryNo,
                 } for product in products]
        return jsonify({"message": "Product Retrieved Successfully",
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
            "categoryNo": category.categoryNo,
            "categoryDesc": category.categoryDesc,
        } for category in categories]
        return jsonify({
            "message": "catgories retrieved",
            "data": results
        })
    if request.method == 'POST':
        body = request.json
        category = db.add_category(body['categoryDesc'])
        return jsonify({
            "message": "Category Created",
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
        body = request.json
        new_order = db.add_orders(body)
        return jsonify({
            "message": "new order",
            "data": new_order
        })

# Transaction Routes

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
