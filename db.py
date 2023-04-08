#!/usr/bin/env python3
"""Database Setup"""
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.exc import InvalidRequestError, NoResultFound
from models import Activities
from models import Base, Employee, Product, ProductCategory, PurchaseOrder, Supplier, Transaction
from models import all_triggers


class DB:
    """DB Class for Object Mapping"""

    def __init__(self):
        """Constructor method"""
        self._engine = create_engine("mysql+mysqlconnector://test:Pa$$word1234@localhost/project_msc")
        # Base.metadata.drop_all(self._engine)
        Base.metadata.create_all(self._engine)
        self.__session = None

    @property
    def _session(self):
        """Session Getter Method"""
        if self.__session is None:
            DBSession = sessionmaker(bind=self._engine)
            self.__session = DBSession()
        return self.__session

    def find_employee_by(self, **kwargs):
        if not kwargs:
            raise InvalidRequestError
        column_names = Employee.__table__.columns.keys()
        for key in kwargs.keys():
            if key not in column_names:
                raise InvalidRequestError

        employee = self._session.query(Employee).filter_by(**kwargs).first()
        if employee is None:
            raise NoResultFound

        return employee

    def add_employee(self,
                     employeeName: str,
                     employeeEmail: str) -> Employee:
        """Creates an employee"""
        employee = Employee(employeeName=employeeName, employeeEmail=employeeEmail)
        self._session.add(employee)
        self._session.commit()

        return employee

    def get_employee(self):
        """Fetches all employees"""
        employees = self._session.query(Employee).all()
        return employees

    def update_employee(self, employee_id, **kwargs):
        """Updates an employee"""
        employee = self.find_employee_by(employeeNo=employee_id)
        column_names = Employee.__table__.columns.keys()
        for key in kwargs.keys():
            if key not in column_names:
                raise ValueError

        for k, v in kwargs.items():
            setattr(Employee, k, v)
        self._session.commit()
        
    def delete_employee(self, employee_id):
        """Deletes an employee"""
        employee = self._session.query(Employee).filter_by(employeeNo=employee_id).delete()
        self._session.commit()
        return employee
        

    def get_product(self):
        """Fetches products from database"""
        products = self._session.query(Product).all()
        return products

    def add_product(self, body_object):
        """Creates a product"""
        new_product = Product(
            productName=body_object.get('productName'),
            serialNo=body_object.get('serialNo'),
            unitPrice=body_object.get('unitPrice'),
            quantityOnHand=body_object.get('quantityOnHand'),
            reorderLevel=body_object.get('reorderLevel'),
            reorderQuantity=body_object.get('reorderQuantity'),
            categoryNo=body_object.get('categoryNo')
        )
        self._session.add(new_product)
        self._session.commit()

        return new_product
    
    def find_product(self, **kwargs):
        """Fetches product"""
        if not kwargs:
            raise InvalidRequestError
        column_name = Product.__table__.columns.keys()
        for key in kwargs.keys():
            if key not in column_name:
                raise InvalidRequestError
            
        product = self._session.query(Product).filter_by(**kwargs).first()
        if product is None:
            raise NoResultFound
        
        return product
        
        
    def update_product(self, product_id, **kwargs):
        """Adds new product"""
        product = self.find_product(id=product_id)
        column_name = Product.__table__.columns.keys()
        for key in kwargs.keys():
            if key not in column_names:
                raise ValueError
            
        for k, v in kwargs.items():
            setattr(product, k, v)
            
        self._session.commit()
        
    def delete_product(self, product_id):
        product = self._session.query(Product).filter_by(productNo=product_id).delete()
        self._session.commit()
        return product
        

    def get_categories(self):
        """Gets product"""
        categories = self._session.query(ProductCategory).all()
        return categories
    
    def delete_categories(self, category_id):
        categories = self._session.query(ProductCategory).filter_by(categoryNo=category_id).delete()
        self._session.commit()
        return categories
    

    def add_category(self, category_data):
        """Adds a new category"""
        new_category = ProductCategory(
            categoryDesc=category_data
        )
        self._session.add(new_category)
        self._session.commit()
        return new_category

    def add_supplier(self, supplier):
        """Creates a new supplier"""
        new_supplier = Supplier(
            supplierName = supplier['supplierName'],
              supplierStreet = supplier['supplierStreet'],
            supplierCity = supplier['supplierCity'],
            supplierState = supplier['supplierState'],
            supplierZipCode = supplier['supplierZipCode'],
            suppTelNo = supplier['suppTelNo'],
            suppFaxNo = supplier['suppFaxNo'],
            suppEmailAddress = supplier['suppEmailAddress'],
            # suppWebddress = supplier['suppWebAddress'],
            contactName = supplier['contactName'],
            contactTelNo = supplier['contactTelNo'],
            contactFaxNo = supplier['contactFaxNo'],
            contactEmalAddress = supplier['contactEmalAddress'],
            paymentTerms = supplier['paymentTerms'],
        )
        self._session.add(new_supplier)
        self._session.commit()
        return new_supplier

    def get_supplier(self):
        """Get suppliers"""
        supplier = self._session.query(Supplier).all()
        return supplier
    
    def delete_supplier(self, supplierId):
        supplier = self._session.query(Supplier).filter_by(supplierNo=supplierId).delete()
        self._session.commit()
        return supplier


    def get_orders(self):
        """getches new orders"""
        orders = self._session.query(PurchaseOrder).all()
        return orders

    def add_orders(self, new_order):
        """Creates a new order"""
        print(new_order)
        new_order_data = PurchaseOrder(
            purchaseOrderDesc = new_order['purchaseOrderDesc'],
            orderDate = new_order['orderDate'],
            dateRequired = new_order['dateRequired'],
            shippedDate = new_order['shippedDate'],
            freightCharge = new_order['freightCharge'],
            supplierNo = new_order['supplierNo'],
            employeeNo = new_order['employeeNo'],
            # transaction = new_order['transaction'],
            )
        self._session.add(new_order_data)
        self._session.commit()

        return new_order_data

    def delete_order(self, order_id):
        orders = self._session.query(PurchaseOrder).filter_by(purchaseOrderNo=order_id).delete()
        self._session.commit()
        return orders
        
    def add_transactions(self, new_transaction):
        """Creates a new transaction"""
        print(new_transaction)
        new_t = Transaction(
            transactionDescription = new_transaction['transactionDescription'],
            unitPrice = new_transaction['unitPrice'],
            unitsOrdered = new_transaction['unitsOrdered'],
            unitsReceived = new_transaction['unitsReceived'],
            unitsSold = new_transaction['unitsSold'],
            unitsWastage = new_transaction['unitsWastage']
        )
        self._session.add(new_t)
        self._session.commit()
        return new_t

    def get_transactions(self):
        """Get transactions"""
        transactions = self._session.query(Transaction).all()
        return transactions
    
    def delete_transaction(self, transaction_id):
        transaction = self._session.query(Transaction).filter_by(transactionNo=transaction_id).delete()
        self._session.commit()
        return transaction