import json
import regex

PATH: str = 'techdc'
# sizes
LARGE: int = 64
SMALL: int = 32
rX_offset = regex.compile(r"\{techdc\d_\w* \[(?:-?\d*\.?\d* ){4}\K.+?(?= \])")
rY_offset = regex.compile(
    r"\{techdc\d_\w* \[(?:-?\d*\.?\d* ){4}\K.+? \] \[ (?:-?\d*\.?\d* ){3}\K.+?(?= )")

# templates
with open(f'{PATH}/techdc_large_A.txt') as file:
    template_large = file.read()
with open(f'{PATH}/techdc_small_A.txt') as file:
    template_small = file.read()
with open(f'{PATH}/techdc.json') as techdcf:
    techdc_chars = json.load(techdcf)


def dc_sign(input, is_large: bool = True):
    if input == None or input == '':
        return None
    input = tuple(input)
    size = LARGE if is_large else SMALL
    template = template_large if is_large else template_small
    brushGroup = '{"classname" "func_detail_illusionary"'

    # character loop
    for letter_index, c in enumerate(input, start=1):
        if c not in techdc_chars:
            continue
        tchar = techdc_chars[c]
        # print(letter_index, c, tchar)
        brush = template
        # X vert loop, 1-18
        for vert_index in range(1, 19):
            needle = rf"(?s)(?:.*?\( (\K-?\d+)){{{vert_index}}}"
            val = int(regex.match(needle, template).group())
            val += size * (letter_index - 1)
            brush = regex.sub(needle, str(val), brush)

        # translate UV, correcting for position in sentence
        x1 = (tchar['x'] - (letter_index - 1)) * size
        y1 = tchar['y'] * size
        brush = rX_offset.sub(str(x1), brush)
        brush = rY_offset.sub(str(y1), brush)
        brushGroup += brush

    brushGroup += '}'
    return brushGroup
