from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from model import Item
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from database import (fetch_all_items, fetch_one_item, create_item, delete_item)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# start with dummy data that uses template

db: List[Item] = [
    Item(
        id = 1,
        PN = "92558A310",
        Desc = "Screw"
    ),
    Item(
        id = 2,
        PN = "8117A52",
        Desc = "Clear Tape"
    )
]

# item1 = {
#     "id": 1,
#     "PN": "310-001010",
#     "Desc": "FG Box"
# }

# itemsList.append(item1)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# @app.get("/api/items")
# async def get_item():
#     return db

@app.get("/api/items", response_model=List[Item])
async def get_item():
    # return db
    response = await fetch_all_items()
    if response:
        return response
    raise HTTPException(404, "Something went wrong}")


# @app.get("/api/items/{id}")
# async def get_item_by_id(id: int):
#     for item in db:
#         if (item.id == id):
#             return item

@app.get("/api/items/{id}", response_model=Item)
async def get_item_by_id(id: str):
    response = await fetch_one_item(id)
    if response:
        return response
    raise HTTPException(404, f"There is no item stored with id {id}")

# @app.post("/api/items")
# async def post_item(item: Item):
#     db.append(item)
#     return db

@app.post("/api/items", response_model=Item)
async def post_item(item: Item):
    item = jsonable_encoder(item)
    response = await create_item(item)
    if response:
        return JSONResponse(content=f"{response.inserted_id} was created")
    raise HTTPException(404, "Something went wrong")

# @app.put("/api/items/{id}",response_model=Item)
# async def put_item(id: str, data: Item):
#     for item in db:
#         if (item.id == id):
#             db[item.id-1] = data
#             # db = list(map(lambda x: x.replace(item, data), db)) ??
#             return db
#     raise HTTPException(
#         status_code=404,
#         detail=f"user with id: {id} does not exist"
#     )
    
# @app.delete("/api/items/{id}")
# async def delete_item(id: int):
#     for item in db:
#         if (item.id == id):
#             db.remove(item)
#             return db
    

# @app.delete("/api/items/{id}")
# async def delete_item(id: str):
#     response = await delete_item(id)
#     if (response.deleted_count == 1):
#         return JSONResponse(content=f"item {id} deleted")
#     raise HTTPException(status_code=404, detail=f"Item {id} not found")



