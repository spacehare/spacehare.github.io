import csv
import json
from pathlib import Path
import argparse


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('csv', type=Path)
    args = ap.parse_args()

    src = Path(args.csv)
    reader = csv.DictReader(src.open(encoding='utf-8'))
    data = list(reader)

    out = Path(src.parent / src.with_suffix('.json').name)
    json.dump(data, out.open('w', encoding='utf-8'))
