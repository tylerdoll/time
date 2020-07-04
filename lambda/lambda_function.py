import boto3
from boto3.dynamodb.conditions import Key
import json
from decimal import Decimal

def get_table():
    client = boto3.resource("dynamodb")
    table = client.Table("time_calculator_sessions")
    return table
    
def parse_json(string):
    return json.loads(string, parse_float=Decimal)

def get_session(session_id):
    table = get_table()
    return table.get_item(Key={"id": session_id})["Item"]


def create_new_session(session):
    table = get_table()
    table.put_item(Item=session, ConditionExpression='attribute_not_exists(id)')
    return "saved"


def save_session(session):
    print("Saving session:\n", session)
    table = get_table()
    table.put_item(Item=session)
    return "saved"


def lambda_handler(event, context):
    method = event["requestContext"]["http"]["method"]
    if method == "GET":
        queryStringParameters = event["queryStringParameters"]
        return get_session(queryStringParameters["id"])
    if method == "POST":
        body = parse_json(event["body"])
        return create_new_session(body)
    if method == "PUT":
        body = parse_json(event["body"])
        return save_session(body)
