import { isWidget } from "ckeditor5/src/widget";

/**
 * Checks if the provided model element is `bsParallax`.
 *
 * @param {module:engine/model/element~Element} modelElement
 *   The model element to be checked.
 * @return {boolean}
 *   A boolean indicating if the element is a bsParallax element.
 *
 * @private
 */
export function isBootstrapParallax(modelElement) {
  return !!modelElement && modelElement.is("element", "bsParallax");
}

/**
 * Checks if view element is <bsParallax> element.
 *
 * @param {module:engine/view/element~Element} viewElement
 *   The view element.
 * @return {boolean}
 *   A boolean indicating if the element is a <bsParallax> element.
 *
 * @private
 */
export function isBootstrapParallaxWidget(viewElement) {
  return isWidget(viewElement) && !!viewElement.getCustomProperty("bsParallax");
}

/**
 * Gets `bsParallax` element from selection.
 *
 * @param {module:engine/model/selection~Selection|module:engine/model/documentselection~DocumentSelection} selection
 *   The current selection.
 * @return {module:engine/model/element~Element|null}
 *   The `bsParallax` element which could be either the current selected an
 *   ancestor of the selection. Returns null if the selection has no Parallax
 *   element.
 *
 * @private
 */
export function getClosestSelectedBootstrapParallaxElement(selection) {
  const selectedElement = selection.getSelectedElement();

  return isBootstrapParallax(selectedElement)
    ? selectedElement
    : selection.getFirstPosition().findAncestor("bsParallax");
}

/**
 * Gets selected BsParallax widget if only BsParallax is currently selected.
 *
 * @param {module:engine/model/selection~Selection} selection
 *   The current selection.
 * @return {module:engine/view/element~Element|null}
 *   The currently selected Parallax widget or null.
 *
 * @private
 */
export function getClosestSelectedBootstrapParallaxWidget(selection) {
  const viewElement = selection.getSelectedElement();
  if (viewElement && isBootstrapParallaxWidget(viewElement)) {
    return viewElement;
  }

  // Perhaps nothing is selected.
  if (selection.getFirstPosition() === null) {
    return null;
  }

  let { parent } = selection.getFirstPosition();
  while (parent) {
    if (parent.is("element") && isBootstrapParallaxWidget(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return null;
}

/**
 * Converts a parallax into a settings object.
 *
 * @param {module:engine/view/element~Element|null} parallax
 *   The current parallax.
 * @return {{}}
 *   The settings.
 */
export function convertParallaxToSettings(parallax) {
  const settings = {};

  const bsParallaxSection = parallax.getChild(0);
  const bsParallaxElement = bsParallaxSection.getChild(0);

  settings.image_id = bsParallaxElement.getAttribute("data_image_id");
  settings.title_text = bsParallaxElement.getAttribute("data_title_text");
  settings.title_style_id = bsParallaxElement.getAttribute("data_title_style_id");
  settings.section_class = bsParallaxElement.getAttribute("data_section_class");
  settings.wrapper_style_id = bsParallaxElement.getAttribute("data_wrapper_style_id");
  
  return settings;
  
}
