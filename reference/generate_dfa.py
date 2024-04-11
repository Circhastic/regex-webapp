from DFA import *
import json

def generate_dfa(file_path, dfa_number):
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)

    # Extract the DFA details from the JSON data
    dfa_data = data[dfa_number]
    num_of_states = dfa_data['states']
    alphabet = dfa_data['alphabet']
    start_state = dfa_data['start']
    end_states = dfa_data['final']

    # Convert the transition function list to a dictionary
    transition_function = {} # or dict()
    for item in dfa_data['t_func']:
        current_state = str(item['state'])
        input_char = str(item['input'])
        next_state = str(item['next_state'])
        transition_function[(current_state, input_char)] = next_state

    # Create an object of the DFA with the specifications from the JSON file
    generated_dfa = DFA(num_of_states, alphabet, transition_function, start_state, end_states)
    return generated_dfa