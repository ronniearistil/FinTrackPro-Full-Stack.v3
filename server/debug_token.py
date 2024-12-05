import jwt

def decode_jwt(token, secret_key):
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except Exception as e:
        return {"error": str(e)}
    
"""python debug_token.py"""