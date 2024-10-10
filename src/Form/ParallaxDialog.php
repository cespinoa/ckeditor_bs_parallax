<?php

/**
 * ParallaxDialog.php and command.js exchange these settings
 * 
 * image: parallax image url
 * image_id: parallax image id
 * 
 * title_text: parallax text
 * title_style: parallax text style
 * title_style_id: parallax text style id
 * 
 * section_class: parallax container class [container | container-fluid]
 *
 * wrapper_style: wrapper style
 * wrapper_style_id: container style id
 * 
 * */



namespace Drupal\ckeditor_bs_parallax\Form;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\CloseModalDialogCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\Ajax\EditorDialogSave;
use Drupal\editor\EditorInterface;
use Drupal\editor\Entity\Editor;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\bootstrap_toolbox\UtilityServiceInterface;



/**
 * Creates a parallax dialog form for use in CKEditor.
 *
 * @package Drupal\ckeditor_bs_parallax\Form
 */
class ParallaxDialog extends FormBase {

  /**
   * The utility service.
   *
   * @var \Drupal\bootstrap_toolbox\UtilityServiceInterface
   */
  protected $utilityService;

  /**
   * ParallaxDialog class initialize..
   *
   * @param \Drupal\bootstrap_toolbox\UtilityServiceInterface $utility_service
   *   The utility service.
   */
  public function __construct(UtilityServiceInterface $utility_service) {
    $this->utilityService = $utility_service;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('bootstrap_toolbox.utility_service')
    );
  }

  /**
   * {@inheritDoc}
   */
  public function getFormId() {
    return 'ckeditor_bs_parallax_dialog';
  }

  /**
   * {@inheritDoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, Editor $editor = NULL) {
    $form['#attached']['library'][] = 'editor/drupal.editor.dialog';
    $form['#attached']['library'][] = 'ckeditor_bs_parallax/dialog';

    $input = $form_state->getUserInput();
    
    $imageEntity = NULL;
    
    if (!empty($input['editor_object'])) {
        $settings = $input['editor_object'];
        if(!empty($settings['image_id'])){
          $imageEntity = $this->utilityService->getEntityByTypeAndId('media',$settings['image_id']) ?? NULL;
        } 
    } else {
        $settings = [
          'image' => NULL,
          'title_text' => '',
          'title_style' => NULL,
          'section_class' => 'container',
          'wrapper_style' => NULL,
        ];
    }

    $form['image'] = [
      '#type' => 'entity_autocomplete',
      '#target_type' => 'media',
      '#selection_settings' => [
        'target_bundles' => ['image'],
      ],
      '#title' => $this->t('Select Image'),
      '#tags' => FALSE,
      '#default_value' => $imageEntity,
      '#description' => $this->t('Search and select an image from the media library.'),
    ];

    $form['title_text'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Title'),
      '#default_value' => $settings['title_text'] ?? '',
    ];

    $form['title_style'] = [
      '#type' => 'select',
      '#title' => $this->t('Title style'),
      '#options' => $this->utilityService->getScopeListFiltered(['text_area_formatters']),
      '#empty_option' => 'None',
      '#default_value' => $settings['title_style_id'] ?? NULL,
    ];

    $form['section_class'] = [
      '#type' => 'select',
      '#title' => $this->t('Inner container class'),
      '#options' => [
        'container' => $this->t('Normal container'),
        'container-fluid' => $this->t('Edge to edge container'),
      ],
      '#default_value' => $settings['section_class'],
    ];

    $form['wrapper_style'] = [
      '#type' => 'select',
      '#title' => $this->t('Main container style'),
      '#options' => $this->utilityService->getScopeListFiltered(['text_area_formatters']),
      '#empty_option' => 'None',
      '#default_value' => $settings['wrapper_style_id'],
    ];

    $form_state->set('styles', $this->utilityService->getScopeClassesListFiltered(['text_area_formatters']));
    

    $form['actions']['send'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#button_type' => 'primary',
      // No regular submit-handler. This form only works via JavaScript.
      '#submit' => [],
      '#ajax' => [
        'callback' => '::submitParallaxForm',
        'event' => 'click',
      ],
      '#attributes' => [
        'class' => [
          'js-button-send',
        ],
      ],
    ];
    return $form;
  }
 
  /**
   * {@inheritDoc}
   */
  public function submitParallaxForm(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    
    $styles = $form_state->get('styles');
    
    
    $settings = [
      'image' => $form_state->getValue('image') ? $this->utilityService->getMediaUrlByMediaIdAndImageStyle($form_state->getValue('image'),'default') : '',
      'title_text' => $form_state->getValue('title_text') ?? '',
      'title_style' => $styles[$form_state->getValue('title_style')] ?? '',
      'section_class' => $form_state->getValue('section_class'),
      'wrapper_style' => $form_state->getValue('wrapper_style'),
      
      'image_id' => $form_state->getValue('image') ?? NULL,
      'title_style_id' => $form_state->getValue('title_style') ?? '',
      'wrapper_style_id' => $form_state->getValue('wrapper_style'),
      
    ];
    

    
    $values = ['settings' => $settings];

    $response->addCommand(new EditorDialogSave($values));
    
    $response->addCommand(new CloseModalDialogCommand());

    return $response;
  }

  public function submitForm(array &$form, FormStateInterface $form_state){
    
  }

}
