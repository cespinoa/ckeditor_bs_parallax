import { Command } from "ckeditor5/src/core";
import {
  getClosestSelectedBootstrapParallaxElement,
  isBootstrapParallaxContainer,
} from "./utils";

/**
 * Creates a new BS Parallax
 *
 * @param {module:engine/model/writer~Writer} writer
 *   The model writer.
 * @param {{}} settings
 *   The settings
 * @return {*}
 *   The parallax.
 */
function createBsParallax(writer, settings) {
  const parallaxAttributes = { class: "bs_parallax " + settings.wrapper_style };
  const bsParallax = writer.createElement("bsParallax", parallaxAttributes);

  const sectionAttributes = { class: 'parallax-section ' + settings.section_class };
  const bsParallaxSection = writer.createElement("bsParallaxSection", sectionAttributes);

  const elementAttributes = { class: "parallax-element",
    data: settings.image,
    data_image_id: settings.image_id,
    data_title_text: settings.title_text,
    data_title_style_id: settings.title_style_id,
    data_section_class: settings.section_class,
    data_wrapper_style: settings.wrapper_style,
    data_wrapper_style_id: settings.wrapper_style_id
  };

  const bsParallaxElement = writer.createElement("bsParallaxElement", elementAttributes);

  const titleAttributes = { class: "parallax-title " + settings.title_style };
  const bsParallaxTitle = writer.createElement("bsParallaxTitle", titleAttributes);
  
  writer.insertText(settings.title_text, bsParallaxTitle);

  writer.append(bsParallaxTitle, bsParallaxElement);
  writer.append(bsParallaxElement, bsParallaxSection);
  writer.append(bsParallaxSection, bsParallax);
  
  return bsParallax;

}

/**
 * Updates an existing BS Parallax
 *
 * @param {module:engine/model/writer~Writer} writer
 *   The model writer.
 * @param {module:engine/view/element~Element|null} existingParallax
 * @param {{}} settings
 *   The settings
 */
function updateExisting(writer, existingParallax, settings) {
  const parallaxAttributes = { class: "bs_parallax " + settings.wrapper_style };
  const sectionAttributes = { class: 'parallax-section ' + settings.section_class };
  const elementAttributes = { class: "parallax-element",
    data: settings.image,
    data_image_id: settings.image_id,
    data_title_text: settings.title_text,
    data_title_style_id: settings.title_style_id,
    data_section_class: settings.section_class,
    data_wrapper_style: settings.wrapper_style,
    data_wrapper_style_id: settings.wrapper_style_id
  };
  const titleAttributes = { class: "parallax-title " + settings.title_style };
  
  const bsParallaxSection = existingParallax.getChild(0);
  const bsParallaxElement = bsParallaxSection.getChild(0);

  const bsParallaxTitle = writer.createElement("bsParallaxTitle", titleAttributes);

  writer.remove(bsParallaxElement.getChild(0));
  writer.insertText(settings.title_text, bsParallaxTitle);
  writer.append(bsParallaxTitle, bsParallaxElement);
  writer.setAttributes(elementAttributes, bsParallaxElement);
  writer.setAttributes(sectionAttributes, bsParallaxSection);
  writer.setAttributes(parallaxAttributes, existingParallax);

}

/**
 * Inserts a parallax or updates a new one.
 */
export default class InsertBootstrapParallaxCommand extends Command {
  execute(settings) {
    const { model } = this.editor;
    const existingParallax = getClosestSelectedBootstrapParallaxElement(
      model.document.selection
    );

    model.change((writer) => {
      if (existingParallax) {
        updateExisting(writer, existingParallax, settings);
      } else {
        model.insertContent(createBsParallax(writer, settings));
      }
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "bsParallax"
    );
    this.isEnabled = allowedIn !== null;
  }
}
