from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from model import Item
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from database import (fetch_all_items, fetch_one_item, create_item, delete_one_item, change_item)

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

@app.get("/")
async def root():
    return {"message": "Hello World"}

# @app.get("/api/items")
# async def get_item():
#     return db

@app.get("/api/items", response_model=List[Item])
async def get_item():
    response = await fetch_all_items()
    if response:
        return response
    raise HTTPException(404, "DB empty or Something went wrong}")


# @app.get("/api/items/{id}")
# async def get_item_by_id(id: int):
#     for item in db:
#         if (item.id == id):
#             return item

@app.get("/api/items/{id}", response_model=Item)
async def get_item_by_id(id: int):
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
        return JSONResponse(content=f"new item with id {response.inserted_id} was created")
    raise HTTPException(404, "Something went wrong")

@app.put("/api/items/{id}", response_model=Item) #// add response_description="Update an item"
async def update_item(id: int, item: Item):
    item = jsonable_encoder(item)
    response = await change_item(id, item)
    if response:
        return JSONResponse(content=f"item with id: {id} was successfully updated")
    raise HTTPException(404, f"item with id: {id} does not exist or Something went wrong")

    
# @app.delete("/api/items/{id}")
# async def delete_item(id: int):
#     for item in db:
#         if (item.id == id):
#             db.remove(item)
#             return db


@app.delete("/api/items/{id}")
async def delete_item(id: int):
    response = await delete_one_item(id)
    if (response.deleted_count == 1):
        return JSONResponse(content=f"item {id} deleted")
    raise HTTPException(status_code=404, detail=f"Item {id} not found")
