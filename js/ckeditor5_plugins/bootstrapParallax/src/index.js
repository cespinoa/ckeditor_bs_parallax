import { Plugin } from "ckeditor5/src/core";
import BootstrapParallaxEditing from "./editing";
import BootstrapParallaxUi from "./ui";
import BootstrapParallaxToolbar from "./toolbar";

class BootstrapParallax extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [BootstrapParallaxEditing, BootstrapParallaxUi, BootstrapParallaxToolbar];
  }

  /**
   * @inheritdoc
   */
  static get pluginName() {
    return "BootstrapParallax";
  }
}

export default {
  BootstrapParallax,
};
