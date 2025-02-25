import json

class DFA:
    def __init__(self, states, alphabet, transition_function, start_state, end_states):
        " DFA class constructor "
        self.states = states
        self.alphabet = alphabet
        self.transition_function = transition_function
        self.start_state = start_state
        self.end_states = end_states

        self.current_state = start_state
        self.transition_path = [start_state]  # Add a list to keep track of the transition path

    def check_word(self, given_word):
        """ a function that, given a word, checks the state transitions from the transfer function and
        returns if it reached a final state or not, meaning if the word is valid or not """

        # begin at the start state
        self.current_state = self.start_state
        self.transition_path = [self.start_state]  # Reset the transition path at the start of each word check

        """ for each character in a word, check if the pair of the character and the current state is
        defined in the transfer function. if it is then change the current state to the next state
        from the transfer function. if it isn't then set the current state to 'None' """
        for current_character in given_word:
            if (self.current_state, current_character) not in self.transition_function.keys():
                self.current_state = None
            else:
                self.current_state = self.transition_function[(self.current_state, current_character)]
                self.transition_path.append(self.current_state)  # Append the new state to the transition path

        # return 'True' if the last current state was in the defined final states
        # returns the Transition Path as well
        return self.current_state in self.end_states, self.transition_path


def generate_dfa(file_path, dfa_number):
    " Generate a DFA object from a JSON file (usage: ./your_file, dfa_1) "
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