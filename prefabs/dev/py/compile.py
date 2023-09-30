'''compile .txt brushes and .json settings into one file'''

import collections.abc
import os
import json
import pathlib
from pathlib import Path, PurePath
import re

RAW = r'prefabs\src\assets\raw'
SETTINGS = '_settings.json'

output: dict = {}
tb_object_total: int = 1

after_raw = re.compile(r'(?<=raw\\).+')

# https://stackoverflow.com/questions/5967500/how-to-correctly-sort-a-string-with-a-number-inside
# https://stackoverflow.com/a/5967539


def atoi(text):
    return int(text) if text.isdigit() else text


def natural_keys(text):
    return [atoi(c) for c in re.split(r'(\d+)', text)]


def get_content(path) -> str:
    with open(path, 'r', encoding='utf-8') as file:
        return file.read()


def nest(d: dict, l: list, final: dict = {}):
    # https://stackoverflow.com/a/69929117
    *path, last = l
    for p in path:
        d = d.setdefault(p, {})
    if last != "":
        d[last] = d[last] | final if last in d else final


for path, dirs, files in os.walk(RAW):
    relevant_dirs = after_raw.search(path)
    if not relevant_dirs or not files:
        continue
    files.sort(key=natural_keys)
    split_dirs: list = relevant_dirs.group().split('\\')

    for file in files:
        f_path: str = str(pathlib.PurePath(path, file))
        content: str = get_content(f_path)
        stem: str = os.path.splitext(file)[0]
        # dir_stem: str = pathlib.Path(path).stem
        print(f'{tb_object_total:3}. {split_dirs} {stem}')

        # contains TB object: brush or entity
        if file.endswith('.txt'):
            tb_object_total += 1
            nest(output, split_dirs + ['objects'] +
                 [stem], {'text': content})

        # contains configuration / group settings / individual settings
        elif file.endswith('.json'):
            jcontent = json.loads(content)
            if file == SETTINGS:
                nest(output, split_dirs, jcontent)
            else:
                nest(output, split_dirs + ['objects'] +
                     [stem], jcontent)


with open(r'prefabs/src/assets/pycompiled.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent='\t')

print('\ndone\n')
