/*eslint-disable */
define(["jquery", "Magento_PageBuilder/js/utils/loader"], function (_jquery, _loader) {
  /**
   * Copyright © Magento, Inc. All rights reserved.
   * See COPYING.txt for license details.
   */

  /**
   * @param {String} contentTypeId The ID in the registry of the content type.
   * @param {String} elementId The ID of the editor element in the DOM.
   * @param {String} contentTypeName The type of content type this editor will be used in. E.g. "banner".
   * @param {AdditionalDataConfigInterface} config The configuration for the wysiwyg.
   * @param {DataStore} dataStore The datastore to store the content in.
   * @param {String} fieldName The key in the provided datastore to set the data.
   * @returns {Wysiwyg}
   * @api
   */
  function create(contentTypeId, elementId, contentTypeName, config, dataStore, fieldName) {
    config = _jquery.extend(true, {}, config);
    return new Promise(function (resolve) {
      (0, _loader)([config["adapter_config"].component], function (WysiwygInstance) {
        new Promise(function (configResolve) {
          if (config["adapter_config"].initializers && config["adapter_config"].initializers.config && config["adapter_config"].initializers.config[contentTypeName]) {
            (0, _loader)([config["adapter_config"].initializers.config[contentTypeName]], function (InitializerInstance) {
              var initializer = new InitializerInstance(); // Allow dynamic settings to be set before editor is initialized

              initializer.initialize(contentTypeId, config);
              configResolve();
            });
          } else {
            configResolve();
          }
        }).then(function () {
          // Instantiate the component
          var wysiwyg = new WysiwygInstance(contentTypeId, elementId, config, dataStore, fieldName);

          if (config["adapter_config"].initializers && config["adapter_config"].initializers.component && config["adapter_config"].initializers.component[contentTypeName]) {
            (0, _loader)([config["adapter_config"].initializers.component[contentTypeName]], function (InitializerInstance) {
              var initializer = new InitializerInstance(); // Allow dynamic bindings from configuration such as events from the editor

              initializer.initialize(wysiwyg);
              resolve(wysiwyg);
            });
          } else {
            resolve(wysiwyg);
          }
        });
      });
    });
  }

  return create;
});
//# sourceMappingURL=factory.js.map
