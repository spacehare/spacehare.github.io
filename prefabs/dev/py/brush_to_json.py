import json
import pyperclip
from ahk import AHK

a = AHK()


def brush_to_json():
    pyperclip.copy('"brush": ' + json.dumps(pyperclip.paste()))
    pyperclip.paste()
    a.send_input("^{v}")


a.add_hotkey("!b", brush_to_json)

a.start_hotkeys()
a.block_forever()
