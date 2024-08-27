# CK Editor Parallax

**Maintainer:** [Carlos Espino](https://www.drupal.org/u/carlos-espino) 
**Dependencies**: Bootstrap Toolbox, Bootstrap Toolbox Parallax

## Overview

**CK Editor Parallax** is a module that provides a plugin for CKEditor 5, enabling content creators to easily insert a parallax block containing an image and text. This plugin offers a high level of customization, allowing for flexible design and integration into any Bootstrap-based theme.

### Features

- **Parallax Block Creation**: Insert an image and text to create a parallax effect, enhancing the visual appeal of your content.
- **Full-width or Centered Containers**: Choose whether the parallax block should stretch across the entire width of the page or be centered within a container.
- **Customizable Styles**: Select custom styles for both the outer wrapper of the parallax block and the text within. These styles are managed through Bootstrap Toolbox to ensure consistency across your site.
- **Integration with Bootstrap**: Leverages Bootstrap’s grid system and styling options, making it perfect for Bootstrap-based Drupal themes.

## Requirements

- **Bootstrap Toolbox**: CK Editor Parallax depends on the [Bootstrap Toolbox](https://www.drupal.org/project/bootstrap_toolbox) module for centralized style management.
- **Bootstrap Toolbox Parallax**: Also requires the [Bootstrap Toolbox Parallax](https://www.drupal.org/project/bt_parallax) module for specific parallax functionalities.

## Installation

1. Download and install the **CK Editor Parallax** module via Composer or manually from [Drupal.org](https://www.drupal.org/project/ckeditor_bs_parallax):

    ```bash
    composer require drupal/ckeditor_bs_parallax
    ```

2. Enable the module:

    ```bash
    drush en ckeditor_bs_parallax
    ```

3. Ensure that both the **Bootstrap Toolbox** and **Bootstrap Toolbox Parallax** modules are installed and enabled.

4. Configure the plugin in the CKEditor settings under **Configuration** > **Content authoring** > **CKEditor**.

## Configuration

1. Navigate to **Configuration** > **Content authoring** > **CKEditor** and select the editor profile where you want to enable the CK Editor Parallax plugin.
2. Drag the **Parallax** button into the active toolbar.
3. Customize the settings for the parallax blocks, including the image, text, container style, and text style.
4. The available styles for the parallax blocks are managed through the **Bootstrap Toolbox** module, ensuring consistent styling across your site.

## Usage

Once configured, you can use the **Parallax** button in the CKEditor toolbar to insert a customizable parallax block into your content. The plugin allows you to:

- Upload or select an image for the parallax background.
- Enter text that will overlay the image.
- Choose whether the parallax block is full-width or contained within a central container.
- Apply predefined styles to the outer wrapper and the text, all managed through Bootstrap Toolbox.

## Customization

- **Styles Management**: All styles applied to the parallax blocks are managed centrally through the **Bootstrap Toolbox** module, ensuring that your site’s design remains consistent.
- **Parallax Options**: Customize the parallax effect and the appearance of your content using the options provided by the plugin.

## Troubleshooting

- **Parallax Effect Not Displaying**: Ensure that the Bootstrap Toolbox and Bootstrap Toolbox Parallax modules are correctly configured and that the necessary styles are defined.
- **Plugin Not Appearing in CKEditor**: Confirm that the CK Editor Parallax module is enabled and that the plugin is added to the CKEditor toolbar.

## Maintainers

- Carlos Espino - [Drupal.org profile link](https://www.drupal.org/u/carlos-espino)
- Contributions and issues are welcome! Please submit them via the module’s [issue queue on Drupal.org](https://www.drupal.org/project/ckeditor_bs_parallax/issues).

## License

This project is licensed under the GPLv2 license. See the [LICENSE](LICENSE) file for details.
