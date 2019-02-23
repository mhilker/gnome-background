#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
imports.gi.versions.WebKit2 = '4.0';

const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;

class BackgroundApp {
    run() {
        const uri = 'file://' + GLib.get_current_dir() + "/background.jpg";
        const schema = 'org.gnome.desktop.background';
        this.setBackground(uri, schema);
    }

    setBackground(uri, schema) {
        let gsettings = new Gio.Settings({schema: schema});
        let prev = gsettings.get_string('picture-uri');
        gsettings.set_string('picture-uri', uri);
        gsettings.set_string('picture-options', 'zoom');
        Gio.Settings.sync();
        gsettings.apply();
        return (prev != uri)
    }
}

const app = new BackgroundApp();
app.run();
