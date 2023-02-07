import re
from pyperclip import copy
import os
from pprint import pprint
import json
import pathlib
from collections import defaultdict

fullpath = os.path.dirname(os.path.realpath(__file__))

# print(os.getcwd())


# https://stackoverflow.com/questions/5967500/how-to-correctly-sort-a-string-with-a-number-inside

def atoi(text):
    return int(text) if text.isdigit() else text


def natural_keys(text):
    '''
    alist.sort(key=natural_keys) sorts in human order
    http://nedbatchelder.com/blog/200712/human_sorting.html
    (See Toothy's implementation in the comments)
    '''
    return [atoi(c) for c in re.split(r'(\d+)', text)]


def get_content(path):
    with open(path, 'r') as ofile:
        return ofile.read()


out = []
for (dirpath, dirnames, files) in os.walk(r'prefabs\assets\raw'):
    # print(dirpath)
    # for dirname in dirnames:
    #     print('dirname', dirname)

    # for n in files:
    #     print('FILE', n)
    if files:
        files.sort(key=natural_keys)
        print(files)
        out.append({
            'folder_name': pathlib.PurePath(dirpath).name,
            'files': [{'name': os.path.splitext(f)[0], 'content': get_content(os.path.join(dirpath, f))} for f in files],
            'path': dirpath,
        })
        # 'final_folder': pathlib.PurePath(dirpath).name

    # for name in files:
    #     if name != 'compiled.json':
    #         fullpath = os.path.join(dirpath, name)
    #         with open(fullpath, 'r') as ofile:
    #             content = ofile.read()
    #         out.append(
    #             {"fullpath": fullpath,
    #              "folder": pathlib.PurePath(dirpath).name,
    #              "fullfolder": dirpath,
    #              "name": os.path.splitext(name)[0],
    #              "content": content})

# for out['']

# pprint(f)
# pprint(out)

# groups = defaultdict(list)
# for o in out:
#     groups[o['folder']].append(o)

# out = list(groups.values())
# pprint(out)


# tohtml = "\n".join(f'<{b}>' for b in out)
# print(tohtml)
# print(json.dumps(out))


with open(r'prefabs\assets\compiled.json', 'w') as f:
    json.dump(out, f)
