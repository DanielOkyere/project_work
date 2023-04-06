#!/usr/bin/env python3
""" Models"""
from sqlalchemy import Column, String, Integer, DateTime, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import text

Base = declarative_base()


# Tables
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

class ProductCategory(Base):
    """Category Declaration"""
    __tablename__ = "category"
    categoryNo = Column(Integer, primary_key=True)
    categoryDesc = Column(String(300))


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
    categoryNo = Column(Integer, ForeignKey('category.categoryNo', name='P_CATNO_FK'), nullable=True)
    # transaction = Column(Integer, ForeignKey('transaction.transactionNo', name='P_TR_FK'), nullable=True)


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
    # suppWebAddress = Column(String(25))
    contactName = Column(String(25))
    contactTelNo = Column(String(25))
    contactFaxNo = Column(String(25))
    contactEmalAddress = Column(String(25))
    paymentTerms = Column(String(25))
    # purchaseOrder = Column(Integer, ForeignKey('purchaseOrder.purchaseOrderNo', name='S_PO_FK'), nullable=True)


class PurchaseOrder(Base):
    """Purchase Order"""
    __tablename__ = "purchaseOrder"
    purchaseOrderNo = Column(Integer, primary_key=True)
    purchaseOrderDesc = Column(String(300))
    orderDate = Column(DateTime, default=func.now())
    dateRequired = Column(DateTime, default=func.now())
    shippedDate = Column(DateTime, default=func.now())
    freightCharge = Column(Float)
    supplierNo = Column(Integer, ForeignKey('supplier.supplierNo', name='PO_SP_FK'), nullable=True)
    employeeNo = Column(Integer, ForeignKey('employee.employeeNo', name='E_PO_FK'), nullable=True)
    # transaction = Column(Integer, ForeignKey('transaction.transactionNo', name='PO_T_FK'), nullable=True)


class Transaction(Base):
    """Transaction Details"""
    __tablename__ = "transaction"
    transactionNo = Column(Integer, primary_key=True)
    transactionDate = Column(DateTime, default=func.now())
    transactionDescription = Column(String(300))
    unitPrice = Column(Float)
    unitsOrdered = Column(Integer)
    unitsReceived = Column(Integer)
    unitsSold = Column(Integer)
    unitsWastage = Column(Integer)
    purchaseOrder = Column(Integer, ForeignKey('purchaseOrder.purchaseOrderNo', name='T_PO_FK'), nullable=True)
    productNo = Column(Integer, ForeignKey('product.productNo', name='T_PRN_FK'), nullable=True)


# Triggers
all_triggers = text('''
                        CREATE TRIGGER IF NOT EXISTS employee_ins_tr AFTER INSERT
                        ON `employee` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("New Employee Insert", "Inserted New Employee");
                        
                        CREATE TRIGGER IF NOT EXISTS employee_upd_tr AFTER UPDATE
                        ON `employee` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("Update Employee", "Employee Updated");
                        
                        CREATE TRIGGER IF NOT EXISTS prod_ins_tr AFTER INSERT
                        ON `product` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("New Product Insert", "Inserted New Product");
                        
                        CREATE TRIGGER IF NOT EXISTS prod_up_tr AFTER UPDATE
                        ON `product` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("Update product", "Product Updated"); 
                        CREATE TRIGGER IF NOT EXISTS supplier_ins_tr AFTER INSERT
                        ON `supplier` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("New Supplier Insert", "Inserted New Supplier");
                        
                        CREATE TRIGGER IF NOT EXISTS employee_upd_tr AFTER UPDATE
                        ON `supplier` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("Update Supplier", "Supplier Updated");
                         CREATE TRIGGER IF NOT EXISTS order_ins_tr AFTER INSERT
                        ON `purchaseOrder` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("New order Insert", "Inserted New order");
                        
                        CREATE TRIGGER IF NOT EXISTS employee_upd_tr AFTER UPDATE
                        ON `purchaseOrder` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("Update Order", "Order Updated");
                        
                        CREATE TRIGGER IF NOT EXISTS transaction_ins_tr AFTER INSERT
                        ON `transaction` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("New Employee transaction", "Inserted New transaction");
                        
                        CREATE TRIGGER IF NOT EXISTS transaction_upd_tr AFTER UPDATE
                        ON `transaction` FOR EACH ROW
                        INSERT INTO Activities(activityName, activityDesc)
                        VALUES("Update Transaction", "Transaction Updated");
                        ''')

select_product = text('''SELECT * FROM `product`;''')
