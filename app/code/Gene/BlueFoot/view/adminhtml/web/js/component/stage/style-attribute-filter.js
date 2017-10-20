define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var StyleAttributeFilter = function () {
        function StyleAttributeFilter() {
            _classCallCheck(this, StyleAttributeFilter);
        }

        StyleAttributeFilter.prototype.filter = function filter(data) {
            var styleAttributes = ['width', 'height', 'min_height', 'background_color', 'background_image', 'background_size', 'background_attachment', 'background_repeat', 'background_position', 'border_style', 'border_width', 'border_color', 'border_radius', 'margin_top', 'margin_right', 'margin_bottom', 'margin_left', 'padding_top', 'padding_right', 'padding_bottom', 'padding_left'];
            var result = {};
            Object.keys(data).map(function (key) {
                if (Object.values(styleAttributes).indexOf(key) > -1) {
                    var value = data[key];
                    if (key === 'min_height') {
                        value = value.replace('px', '') + 'px';
                    }
                    if (key === 'background_repeat') {
                        value = value ? 'repeat' : 'no-repeat';
                    }
                    result[this.fromSnakeToCamelCase(key)] = value;
                }
            }.bind(this));
            console.log(result);
            return result;
        };

        StyleAttributeFilter.prototype.fromSnakeToCamelCase = function fromSnakeToCamelCase(string) {
            var parts = string.split(/[_-]/);
            var newString = '';
            for (var i = 1; i < parts.length; i++) {
                newString += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
            }
            return parts[0] + newString;
        };

        return StyleAttributeFilter;
    }();

    exports.default = StyleAttributeFilter;
});