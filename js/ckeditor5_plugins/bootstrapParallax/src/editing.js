import { Plugin } from "ckeditor5/src/core";
import { Widget, toWidget, toWidgetEditable } from "ckeditor5/src/widget";
import InsertBootstrapParallaxCommand from "./command";

/**
 * Defines the editing commands for BS Parallax.
 */
export default class BootstrapParallaxEditing extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [Widget];
  }

  /**
   * @inheritdoc
   */
  static get pluginName() {
    return "BootstrapParallaxEditing";
  }

  constructor(editor) {
    super(editor);
    this.attrs = {
      class: "class",
      "data": "data",
      'data_image_id': 'data_image_id',
      'data_title_style': 'data_title_style',
      'data_title_style_id': 'data_title_style_id',
      'data_title_text': 'data_title_text',
      'data_wrapper_style_id': 'data_wrapper_style_id',
      'data_section_class': 'data_section_class'
    };
  }

  init() {
    const options = this.editor.config.get("bootstrapParallax");
    if (!options) {
      return;
    }

    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <bsParallax>
   *    <bsParallaxSection>
   *        <bsParallaxElement>
   *          <bsParallaxTitle>
   *          </bsParallaxTitle>
   *        </bsParallaxElement>
   *    </parallaxContainer>
   * </bsParallax>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    const { schema } = this.editor.model;
    schema.register("bsParallax", {
      allowWhere: "$block",
      isLimit: true,
      isObject: true,
      allowAttributes: ["class"],
    });
    schema.register("bsParallaxSection", {
      isLimit: true,
      allowIn: "bsParallax",
      isInline: true,
      allowAttributes: ["class"],
    });
    schema.register("bsParallaxElement", {
      isLimit: true,
      allowIn: "bsParallaxSection",
      isInline: true,
      allowAttributes: Object.keys(this.attrs),
    });
    schema.register("bsParallaxTitle", {
      isLimit: true,
      allowIn: "bsParallaxElement",
      isInline: true,
      allowContentOf: "$root",
      allowAttributes: ["class"],
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    const { conversion } = this.editor;

    // <bsParallax>
    conversion.for("upcast").elementToElement({
      model: "bsParallax",
      view: {
        name: "div",
        classes: "bs_parallax",
      },
    });

    conversion.for("downcast").elementToElement({
      model: "bsParallax",
      view: (modelElement, { writer }) => {
        const container = writer.createContainerElement("div", {
          class: "bs_parallax",
        });
        writer.setCustomProperty("bsParallax", true, container);
        return toWidget(container, writer, { label: "BS Parallax" });
      },
    });

    // <bsParallaxSection>
    conversion.for("upcast").elementToElement({
      model: "bsParallaxSection",
      view: {
        name: "section",
      },
    });

    conversion.for("downcast").elementToElement({
      model: "bsParallaxSection",
      view: (modelElement, { writer }) => {
        const container = writer.createContainerElement("section");
        writer.setCustomProperty("bsParallaxSection", true, container);
        return toWidget(container, writer, { label: "BS Parallax Section" });
      },
    });

    // <bsParallaxElement>
    conversion.for("upcast").elementToElement({
      view: {
        name: "div",
        classes: ["parallax-element"],
      },
      converterPriority: "high",
      model: (viewElement, {writer}) => {
        return writer.createElement("bsParallaxElement", {
          class: viewElement.getAttribute('class') || "parallax-element",
        });
      },
    });

    conversion.for("downcast").elementToElement({
      model: "bsParallaxElement",
      view: (modelElement, { writer }) => {
        const parallaxElementAttributes = {
          "class": modelElement.getAttribute('class') || "parallax-element",
          "data": modelElement.getAttribute("data"),
          "data_image_id": modelElement.getAttribute("data_image_id"),
          "data_title_style": modelElement.getAttribute("data_title_style"),
          "data_title_text": modelElement.getAttribute("data_title_text"),
          "data_title_style_id": modelElement.getAttribute("data_title_style_id"),
          "data_wrapper_style_id": modelElement.getAttribute("data_wrapper_style_id"),
          "data_section_class": modelElement.getAttribute("data_section_class"),
          
        };
        const container = writer.createContainerElement("div", parallaxElementAttributes);
        writer.setCustomProperty("bsParallaxElement", true, container);
        return toWidget(container, writer, { label: "BS Parallax Element" });
      },
    });

    // <bsParallaxTitle>
    conversion.for("upcast").elementToElement({
      model: "bsParallaxTitle",
      view: {
        name: "div",
      },
    });

    conversion.for("downcast").elementToElement({
      model: "bsParallaxTitle",
      view: (modelElement, { writer }) => {
        const container = writer.createContainerElement("div");
        writer.setCustomProperty("bsParallaxTitle", true, container);
        return toWidget(container, writer, { label: "BS Parallax Title" });
      },
    });




    

    

    // Set attributeToAttribute conversion for all supported attributes.
    Object.keys(this.attrs).forEach((modelKey) => {
      const attributeMapping = {
        model: {
          key: modelKey,
          name: "bsParallaxElement",
        },
        view: {
          name: "div",
          key: this.attrs[modelKey],
        },
      };
      conversion.for("downcast").attributeToAttribute(attributeMapping);
      conversion.for("upcast").attributeToAttribute(attributeMapping);
    });

    conversion.attributeToAttribute({ model: "class", view: "class" });

  }

  /**
   * Defines the BS Parallax commands.
   *
   * @private
   */
  _defineCommands() {
    this.editor.commands.add(
      "insertBootstrapParallax",
      new InsertBootstrapParallaxCommand(this.editor)
    );
  }
}
