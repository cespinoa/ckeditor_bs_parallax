/**
 * @file registers the parallax toolbar button and binds functionality to it.
 */
import { Plugin } from "ckeditor5/src/core";
import { ButtonView } from "ckeditor5/src/ui";
import icon from "../../../../icons/parallax.svg";

export default class BootstrapParallaxUI extends Plugin {
  init() {
    const { editor } = this;
    const options = editor.config.get("bootstrapParallax");
    if (!options) {
      return;
    }

    const { dialogURL, openDialog, dialogSettings = {} } = options;

    if (!dialogURL || typeof openDialog !== "function") {
      return;
    }

    // This will register the parallax toolbar button.
    editor.ui.componentFactory.add("bootstrapParallax", (locale) => {
      const command = editor.commands.get("insertBootstrapParallax");
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t("Bootstrap Parallax"),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
      this.listenTo(buttonView, "execute", () => {
        openDialog(
          dialogURL,
          ({ settings }) => {
            editor.execute("insertBootstrapParallax", settings);
          },
          dialogSettings
        );
      });

      return buttonView;
    });
  }
}
