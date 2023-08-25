from pydantic import BaseModel
from typing import Optional

# class Item(BaseModel):
#     id: Optional[int]
#     PN: str
#     Desc: str
#     Supplier: str
#     Qty: int
#     Rate: float
#     Total: Optional[float]

class Item(BaseModel):
    id: Optional[int]
    PN: str
    Desc: str
