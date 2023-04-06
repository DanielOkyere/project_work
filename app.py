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
import uuid
import json

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

@app.route('/employee', methods=['GET', 'POST', 'DELETE', 'PUT'])
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
        products = db.add_product(
           body_object=body
        )
        return jsonify({
            "message": "product added successfully",
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
           "categoryDesc": category.categoryDesc,
           "categoryNo": category.categoryNo
        } for category in categories]
        return jsonify({
            "message": "catgories retrieved",
            "data": results
        })
    if request.method == 'POST':
        body = request.json
        category = db.add_category(body['categoryDesc']);
        return jsonify({
            "message": "Category Created",
        })


# Supplier Routes
@app.route('/supplier', methods=['GET', 'POST'])
def supplier_routes():
    """Defines the supplier routes"""
    if request.method == 'GET':
        suppliers = db.get_supplier()
        result = [{
            "supplierName" : supplier.supplierName,
            "supplierStreet" : supplier.supplierStreet,
            "supplierCity" : supplier.supplierCity,
            "supplierState" : supplier.supplierState,
            "supplierZipCode" : supplier.supplierZipCode,
            "suppTelNo" : supplier.suppTelNo,
            "suppFaxNo" : supplier.suppFaxNo,
            "suppEmailAddress" : supplier.suppEmailAddress,
            # "suppWebAddress" : supplier['suppWebAddress'],
            "contactName" : supplier.contactName,
            "contactTelNo" : supplier.contactTelNo,
            "contactFaxNo" : supplier.contactFaxNo,
            "contactEmalAddress" : supplier.contactEmalAddress,
            "paymentTerms" : supplier.paymentTerms,
        }for supplier in suppliers]
        return jsonify({
            "message": "supplier created",
            "data": result
        })

    if request.method == 'POST':
        body = request.json
        new_supplier = db.add_supplier(body)
        return jsonify({
            "message": "new supplier",
        })

# Purchase Order Routes
@app.route('/order', methods=['GET','POST'])
def order_routes():
    """Defines order routes"""
    if request.method == 'GET':
        orders = db.get_orders()
        result = [{
            "orderNo": order.purchaseOrderNo,
            "orderDesc": order.purchaseOrderDesc,
            "orderDate": order.orderDate,
            "dateRequired": order.dateRequired,
            "shippedDate": order.shippedDate,
            "freightCharge": order.freightCharge,
            "supplierNo": order.supplierNo,
            "employeeNo": order.employeeNo
        } for order in orders]
        return jsonify({
            "message": "order retrieved",
            "data": result
        })

    if request.method == 'POST':
        body = request.json
        new_order = db.add_orders(body)
        return jsonify({
            "message": "created New order",
        })

# Transaction Routes
@app.route('/transaction', methods=['GET','POST'])
def transact_routes():
    """Defines the transaction routes"""
    if request.method == 'GET':
        transactions = db.get_transactions()
        result = [{
          "transactionNo": transaction.transactionNo,
          "transactionDate": transaction.transactionDate,
          "transactionDescription": transaction.transactionDescription,
          "unitPrice": transaction.unitPrice,
          "unitsOrdered": transaction.unitsOrdered,
          "unitsReceived": transaction.unitsReceived,
          "unitsSold": transaction.unitsSold,
          "unitsWastage": transaction.unitsWastage,
          "purchaseOrder": transaction.purchaseOrder,
          "productNo": transaction.productNo
        } for transaction in transactions]
        return jsonify({
            "message": "transactions recieved",
            "data": result
        })
    if request.method == 'POST':
        new_transaction = request.json
        result = db.add_transactions(
            new_transaction
        )
        return jsonify({
            "message":"created new Transaction"
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
