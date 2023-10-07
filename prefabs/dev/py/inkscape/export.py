'''for inkscape CLI exports'''

import subprocess
import re
import argparse

INKSCAPE = r"C:\Program Files\Inkscape\bin\inkscape.exe"
HERE = __file__
FILE = '../../main.svg'  # os.path.split(__file__)[0] + r"\main.svg"
DEST = r"../../..\src\assets\svg/"

ap = argparse.ArgumentParser(description="export assistant")

ap.add_argument(
    '-s', '--sall',
    help="Export everything, slowly. (export-id-only WORKING)",
    action='store_true',)
ap.add_argument(
    '-a', '--all',
    help="Export everything. (export-id-only BROKEN)",
    action='store_true',)
ap.add_argument('obj',
                help='Export one object from the canvas by its id.',
                nargs='?')


# convert id. ex: 'id_czg_12' to 'czg 12'
def clean(input: str):
    return input.replace('_', ' ')[3:]


def get_ids(input: list[str]):
    return [match.group(0) for o in input
            if (match := re.match(r'id[^,]+', o))]


if __name__ == '__main__':
    print('Processing SVGs...')
    user_args = ap.parse_args()

    if user_args.all:
        query = subprocess.run([INKSCAPE, '--query-all', FILE],
                               capture_output=True, text=True).stdout.split('\n')
        query = get_ids(query)
        query = ' '.join(
            [f'export-id:{o}; export-filename:{DEST}{clean(o)}.svg; export-do;' for o in query])
        query = query[:-11]

        err = subprocess.run([INKSCAPE,
                              '--actions=' + 'export-plain-svg;' + query,
                              FILE
                              ],
                             capture_output=True, text=True).stderr
        print(err)

    elif user_args.sall:
        query = subprocess.run([INKSCAPE, '--query-all', FILE],
                               capture_output=True, text=True).stdout.split('\n')
        query = get_ids(query)
        for shape in query:
            name = clean(shape)
            print(shape, name)
            subprocess.run([INKSCAPE,
                            '--export-type=svg',
                            f'--export-id={shape}',
                            '--export-id-only',
                            f'--export-filename={DEST}{name}',
                            '--export-plain-svg',
                            FILE],
                           capture_output=True, text=True)

    elif user_args.obj:
        name = clean(user_args.obj)
        print(name)
        subprocess.run([INKSCAPE,
                        '--export-type=svg',
                        f'--export-id={user_args.obj}',
                        '--export-id-only',
                        f'--export-filename={DEST}{name}',
                        '--export-plain-svg',
                        FILE],
                       capture_output=True, text=True)
