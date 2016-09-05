define([
    'jquery',
    'bluefoot/block/abstract',
    'bluefoot/config',
    'bluefoot/common',
    'Gene_BlueFoot/js/form/element/magentowidget'
], function (jQuery, AbstractBlock, Config, Common) {

    AbstractBlock.edit = function() {
        var id = Common.guid(),
            dataKey = '';

        // Determine the field ID for the magento widget
        for(var key in this.config.fields) {
            if (this.config.fields[key]['widget'] == "magentowidget") {
                dataKey = key;
                break;
            }
        }

        if (!dataKey) {
            return false;
        }

        // Call Knockout binding
        var updateData = function(newValue) {
            var data = this.data();
            data[ dataKey ] = newValue;
            this.data(data);
        }.bind(this);

        var originalValue = this.data()[dataKey];

        // Create dummy field on the page for the widget modal to populate.
        // Proxy through change() to knockout update
        jQuery('body').append('<input type="text" id="' + id +'" style="display: none;" />');
        jQuery("#"+id).change(function() {
            updateData(this.value);
            jQuery(this).remove();
        });

        // Open the widget dialog
        WysiwygWidget.Widget.prototype.bluefoot = function() { return originalValue; };
        widgetTools.openDialog(
            Config.getPluginConfig("gene_widget_magentowidget", "widget_url") + 'widget_target_id/' + id + '/'
        );
    };

    return AbstractBlock;
});