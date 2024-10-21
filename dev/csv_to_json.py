import csv
import json
from pathlib import Path
import argparse


def parse(val):
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return val


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('csv', type=Path)
    args = ap.parse_args()

    src = Path(args.csv)
    reader = csv.DictReader(src.open(encoding='utf-8'))
    data = [{key: parse(value) for key, value in row.items()} for row in reader]

    out = Path(src.parent / src.with_suffix('.json').name)
    json.dump(data, out.open('w', encoding='utf-8'))
