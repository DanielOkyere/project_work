#!/usr/bin/env python3
"""Database Setup"""
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.exc import InvalidRequestError, NoResultFound
from models import Activities
from models import Base, Employee, Product, ProductCategory, PurchaseOrder, Supplier
from models import all_triggers


class DB:
    """DB Class for Object Mapping"""

    def __init__(self):
        """Constructor method"""
        self._engine = create_engine("mysql+mysqlconnector://test:Pa$$word1234@localhost/project_msc")
        Base.metadata.drop_all(self._engine)
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
        employee = self.find_employee_by(id=employee_id)
        column_names = Employee.__table__.columns.keys()
        for key in kwargs.keys():
            if key not in column_names:
                raise ValueError

        for k, v in kwargs.items():
            setattr(employee, k, v)

        self._session.commit()

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

    def get_categories(self):
        """Gets product"""
        categories = self._session.query(ProductCategory).all()
        return categories

    def add_category(self, category_data):
        """Adds a new category"""
        new_category = ProductCategory(
            categoryDesc=category_data.get('categoryDesc'),
            products=category_data.get('products')
        )
        self._session.add(new_category)
        self._session.commit()
        return new_category

    def add_supplier(self, supplier_data):
        """Creates a new supplier"""
        new_supplier = Supplier(
            supplier_data
        )
        self._session.add(new_supplier)
        self._session.commit()
        return new_supplier

    def get_supplier(self):
        """Get suppliers"""
        supplier_data = self._session.query(Supplier).all()
        return supplier_data


    def get_orders(self):
        """getches new orders"""
        orders = self._session.query(PurchaseOrder).all()
        return orders

    def add_orders(self, new_order):
        """Creates a new order"""
        new_order_data = PurchaseOrder(new_order)
        self._session.add(new_order_data)
        self._session.commit()

        return new_order_data

    def add_transactions(self, new_transaction):
        """"""