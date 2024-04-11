from DFA import *


def scan_input_file(input_file_name):
    " A function that scans the input file line by line and returns a DFA object based on what's scanned "
    input_file = open(input_file_name, 'r')  # open the input file

    # read the 1st line and turn it to an integer
    num_of_states = int(input_file.readline())
    print('Number of states: ', num_of_states, type(num_of_states))

    # read the 2nd line, strip the front/end spaces
    alphabet = input_file.readline().strip()
    # split the characters to create a string list
    alphabet = alphabet.split()
    print('Alphabet symbols: ', alphabet)

    # read the 3rd line, strip the front/end spaces
    start_state = input_file.readline().strip()
    print('Initial/Starting state: ', start_state, type(start_state))

    # read the 4th line, strip the front/end spaces
    end_states = input_file.readline().strip()
    # split the characters to create a string list
    end_states = end_states.split()
    print('Final/Ending states: ', end_states, type(end_states))

    print('Transfer function: ')
    transfer_function = dict()

    # read all the other lines, one line at a time
    for line in input_file:
        current_transition = line.strip()   # strip the front/end spaces
        # split the characters to create a string list
        current_transition = current_transition.split()
        print(current_transition)

        # create a tuple out of the first two characters to create a dictionary key for the transfer
        # function, and set the third character as the value for this specific key
        transfer_function[tuple([current_transition[0], current_transition[1]])] = current_transition[2]

    input_file.close()  # close the input file

    print('---------------')

    # create an object of the DFA with the specifications of the input file
    generated_dfa = DFA(num_of_states, alphabet, transfer_function, start_state, end_states)

    return generated_dfa
