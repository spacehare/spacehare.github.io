'''inkscape in-program batch export prepends an underscore to each .SVG'''

import os

SVG_PATH = r'prefabs/assets/svg/'

for f in os.listdir(SVG_PATH):
    if f.startswith('_'):
        f_without_underscore = SVG_PATH + f[1:]
        print(f)
        if os.path.isfile(f_without_underscore):
            os.remove(f_without_underscore)
        os.rename(SVG_PATH + f, f_without_underscore)
