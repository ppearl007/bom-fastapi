from pydantic import BaseModel, Field, ValidationError
from typing import Optional
from bson.objectid import ObjectId
from uuid import uuid4


# class PyObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate

#     @classmethod
#     def validate(cls, v):
#         if not ObjectId.is_valid(v):
#             raise ValueError("Invalid objectid")
#         return ObjectId(v)

#     @classmethod
#     def __modify_schema__(cls, field_schema):
#         field_schema.update(type="string")

# class Item(BaseModel):
#     id: Optional[int]
#     PN: str
#     Desc: str
#     Supplier: str
#     Qty: int
#     Rate: float
#     Total: Optional[float]

class Item(BaseModel):
    id: int
    # id: str = Field(default_factory=uuid4)
    PN: str
    Desc: str

try:
    Item()
except ValidationError as exc:
    print(repr(exc.errors()[0]['type']))
    #> 'missing'
