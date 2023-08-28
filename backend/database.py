from model import Item
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from fastapi.encoders import jsonable_encoder
import pydantic

MONGODB_URL = "mongodb+srv://pelu:WH7VVxYUCxs4riiB@cluster0.ga23agj.mongodb.net/"
client = AsyncIOMotorClient(MONGODB_URL)
# client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])

db = client.BOM
collection = db.items

async def fetch_one_item(id):
    document = await collection.find_one({"_id": ObjectId(id)})
    return document

async def fetch_all_items():
    items = await collection.find().to_list(1000)
    # for document in await cursor:
    #     items.append(Item(**document)) #include every document which follows the items defined in the model.py file
    return items

async def create_item(item):
    document = jsonable_encoder(item)
    result = await collection.insert_one(document)
    return result

async def delete_item(id):
    result = await collection.delete_one({"_id": ObjectId(id)})
    return result

