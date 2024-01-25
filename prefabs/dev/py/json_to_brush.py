import json
import pyperclip
from ahk import AHK

a = AHK()


def json_to_brush():
    pyperclip.copy(json.loads(pyperclip.paste()))
    pyperclip.paste()
    # a.send_input("^{v}")


a.add_hotkey("!v", json_to_brush)

a.start_hotkeys()
a.block_forever()
