from DFA import *
from scan_input_file import *

selected_dfa = "dfa_1"
dfa = scan_input_file("reference/dfa_1.txt")

given_word = None

while given_word != 'exit':
    given_word = input('Type a word (type \'exit\' to stop): ')

    if given_word == 'exit':
        print('\nExiting...')
    else:
        if dfa.check_word(given_word):
            print('\tGiven word is VALID\n')
        else:
            print('\tGiven word is INVALID\n')
