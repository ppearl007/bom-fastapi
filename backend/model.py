from pydantic import BaseModel, ValidationError
from typing import Optional
from bson.objectid import ObjectId
import pydantic

# class Item(BaseModel):
#     id: Optional[int]
#     PN: str
#     Desc: str
#     Supplier: str
#     Qty: int
#     Rate: float
#     Total: Optional[float]

class Item(BaseModel):
    # id: Optional[int]
    # id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    PN: str
    Desc: str

try:
    Item()
except ValidationError as exc:
    print(repr(exc.errors()[0]['type']))
    #> 'missing'
