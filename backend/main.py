from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from model import Item

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

@app.get("/api/items")
async def get_item():
    return db

@app.get("/api/items/{id}")
async def get_item_by_id(id: int):
    for item in db:
        if (item.id == id):
            return item

@app.post("/api/items")
async def post_item(item: Item):
    db.append(item)
    return db

@app.put("/api/items/{id}")
async def put_item(id: int, data: Item):
    for item in db:
        if (item.id == id):
            db[item.id-1] = data
            # db = list(map(lambda x: x.replace(item, data), db)) ??
            return db
    raise HTTPException(
        status_code=404,
        detail=f"user with id: {id} does not exist"
    )
    
@app.delete("/api/items/{id}")
async def delete_item(id: int):
    for item in db:
        if (item.id == id):
            db.remove(item)
            return db



