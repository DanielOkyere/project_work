#!/usr/bin/env python3
""" Models"""
from sqlalchemy import Column, String, Integer, DateTime, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import text


Base = declarative_base()

#Tables
class Activities(Base):
    """Declaration for activities"""
    __tablename__ = "activities"
    id = Column(Integer, primary_key=True)
    activityName = Column(String(30))
    activityDesc = Column(String(255))
    activityDate = Column(DateTime(timezone=True), server_default=func.now())
    activityUpdated = Column(DateTime(timezone=True), onupdate=func.now())
    
    
class Employee(Base):
    """Employee Declaration"""
    __tablename__ = "employee"
    employeeNo = Column(Integer, primary_key=True)
    employeeName = Column(String(30))
    employeeEmail = Column(String(30))
    purchaseOrder = relationship("PurchaseOrder", backref="employee")

    

class ProductCategory(Base):
    """Category Declaration"""
    __tablename__ = "category"
    categoryNo = Column(Integer, primary_key=True)
    categoryDesc = Column(String(300))
    products = relationship('Product', backref='category')
    

class Product(Base):
    """Product Declaration"""
    __tablename__ = "product"
    productNo = Column(Integer, primary_key=True)
    productName = Column(String(25))
    serialNo = Column(String(25), unique=True)
    unitPrice = Column(Float)
    quantityOnHand = Column(Integer)
    reorderLevel = Column(Integer)
    reorderQuantity = Column(Integer)
    reorderLeadTime = Column(DateTime)
    categoryNo = Column(Integer, ForeignKey('category.categoryNo'))
    transaction = relationship('Transaction', backref='product')
    

class Supplier(Base):
    """Supplier Declaration"""
    __tablename__ = "supplier"
    supplierNo = Column(Integer, primary_key=True)
    supplierName = Column(String(25))
    supplierStreet = Column(String(25))
    supplierCity = Column(String(25))
    supplierState = Column(String(25))
    supplierZipCode = Column(String(25))
    suppTelNo = Column(String(25))
    suppFaxNo = Column(String(25))
    suppEmailAddress = Column(String(25))
    contactName = Column(String(25))
    contactTelNo = Column(String(25))
    contactFaxNo = Column(String(25))
    contactEmalAddress = Column(String(25))
    paymentTerms = Column(String(25))
    purchaseOrder = relationship("PurchaseOrder", backref="supplier")
    

class PurchaseOrder(Base):
    """Purchase Order"""
    __tablename__ = "purchaseOrder"
    purchaseOrderNo = Column(Integer, primary_key=True)
    purchaseOrderDesc = Column(String(300))
    orderDate = Column(DateTime)
    dateRequired = Column(DateTime)
    shippedDate = Column(DateTime)
    freightCharge = Column(Float)
    supplierNo = Column(Integer, ForeignKey('supplier.supplierNo'))
    employeeNo = Column(Integer, ForeignKey('employee.employeeNo'))
    transaction = relationship('Transaction', backref='orders')
    

class Transaction(Base):
    """Transaction Details"""
    __tablename__ = "transaction"
    transactionNo = Column(Integer, primary_key=True)
    transactionDate = Column(DateTime)
    transactionDescription = Column(String(300))
    unitPrice = Column(Float)
    unitsOrdered = Column(Integer)
    unitsReceived = Column(Integer)
    unitsSold = Column(Integer)
    unitsWastage = Column(Integer)
    purchaseOrder = Column(Integer, ForeignKey('purchaseOrder.purchaseOrderNo'))
    productNo = Column(Integer, ForeignKey('product.productNo'))
    
    
activity_func = text(''' CREATE FUNCTION IF NOT EXISTS activity_function(activityName VARCHAR(50), activityDesc VARCHAR(255))
                     RETURNS INTEGER 
                     DETERMINISTIC
                     BEGIN
                     INSERT INTO Activities(activityName, activityDesc)
                     VALUES (activityName, activityDesc);
                     RETURN 1;
                     END;
                     ''')

#Triggers
employee_trigger = text('''
                        CREATE TRIGGER IF NOT EXISTS employee_ins_tr AFTER INSERT
                        ON employee FOR EACH ROW
                        BEGIN
                            CALL activity_function('Employee added','NEW.employeeEmail' );
                        END;
                        ''')