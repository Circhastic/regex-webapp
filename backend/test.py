from DFA import *

selected_dfa = input("Select a DFA (1 or 2): ")

if selected_dfa not in ["1", "2"]:
    print("Invalid selection. Exiting...")
    exit()

JSON_FILE = "dfa_selection.json"
dfa = generate_dfa(JSON_FILE, selected_dfa)

given_word = None

while given_word != 'exit':
    given_word = input('Type a word (type \'exit\' to stop): ')

    if given_word == 'exit':
        print('\nExiting...')
    else:
        result = dfa.check_word(given_word)
        is_valid = result[0]
        transition_path = result[1]
        if is_valid:
            print('\tTransition path: ', dfa.transition_path, '\n')
            print('\tGiven word is VALID\n')
        else:
            print('\tTransition path: ', dfa.transition_path, '\n')
            print('\tGiven word is INVALID\n')