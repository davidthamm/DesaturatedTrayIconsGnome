import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Clutter from 'gi://Clutter';

export default class PlainExampleExtension extends Extension {
    enable() {
        this._child_added_signal_id = Main.panel._rightBox.connect(
            'child-added', 
            this._child_added_event_handler.bind(this)
        );
        this._add_effects();
    }

    disable() {
        if (this._child_added_signal_id) {
            Main.panel._rightBox.disconnect(this._child_added_signal_id);
            this._child_added_signal_id = null;
        }
        this._remove_effects();
    }

    _child_added_event_handler(_, child) {
        child.add_effect(new Clutter.DesaturateEffect());
    }

    _get_tray() {
        return Main.panel._rightBox.get_children();
    }

    _add_effects() {
        for (let child of this._get_tray()) {
            child.add_effect(new Clutter.DesaturateEffect());
        }
    }

    _remove_effects() {
        for (let child of this._get_tray()) {
            for (let effect of child.get_effects()) {
                if (effect instanceof Clutter.DesaturateEffect) {
                    child.remove_effect(effect);
                }
            }
        }
    }
}

