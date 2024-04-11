from fastapi import FastAPI, Path, HTTPException
from DFA import *

app = FastAPI()

@app.get("/")
def home():
    return {"message": "RegEx Wizard"}

@app.get("/check_word/{selected_dfa}/{given_word}")
def check_word(selected_dfa: str = Path(description="User selected DFA"), given_word: str = Path(description="The word to be checked")):

    JSON_FILE = "dfa_selection.json"
    dfa = generate_dfa(JSON_FILE, selected_dfa)
    result = dfa.check_word(given_word)
    is_valid = result[0]
    transition_path = result[1]
    return {"is_valid": is_valid, "transition_path": transition_path}