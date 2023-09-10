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

#using id generated from frontend instead of Mongo ObjID(_id) helps avoid issues
async def delete_one_item(id):
    result = await collection.delete_one({"id": id}) 
    return result

#use id generated from frontend instead of Mongo ObjID(_id) helps avoid issues
async def change_item(id, item):
    document = jsonable_encoder(item)
    # result = await collection.update_one({'id': id}, {'$set': document})
    # return result
    print (document)
    if len(document) >= 1:
        updated_result = await collection.update_one({"id": id}, {"$set": document})
        # print(updated_result.matched_count)
        # return updated_result

        if updated_result.modified_count == 1:
            if (updated_result := await collection.find_one({"id": id})) is not None:
                return updated_result


    # old_doc = await collection.find_one({"id": id})
    # print(old_doc['_id'])
    # _id = old_doc['_id']
    # result = await collection.replace_one({'_id': _id}, document)
    # new_document = await collection.find_one({'_id': _id})
    # return new_document