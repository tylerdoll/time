class SessionIdExistsException(Exception):
    def __init__(self, session_id):
        message = f"Session with ID {session_id} already exists"
