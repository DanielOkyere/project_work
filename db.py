#!/usr/bin/env python3
"""Database Setup"""
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import Activities
from models import Base

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
        
    def insert_activity(self, name, description):
        """Function to insert into activities table"""
        with self.__engine.connect() as conn:
            conn.execute(Activities.__table__.insert(),{
                'description': f'{name}: {description}'
            })
        