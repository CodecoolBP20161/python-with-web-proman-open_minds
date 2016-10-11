from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model


# Configure your database connection here
# database name = should be your username on your laptop
# database user = should be your username on your laptop
db = PostgresqlDatabase('lombocska', user='lombocska')


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


# class Person(BaseModel):
#
#     name = CharField()
#     age = IntegerField()
#
#     # @classmethod
#     # def get_serialized_persons(cls):
#     #     people_list = []
#     #     for element in Person.select():
#     #         people_list.append(model_to_dict(element))
#     #     return people_list
#
#
#     @classmethod
#     def get_serialized_persons(cls):
#         people_dict = {}
#         for element in Person.select():
#             people_dict[element.id] = model_to_dict(element)
#         return people_dict
