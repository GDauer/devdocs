<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Gene\BlueFoot\Ui\Component\Form\Element\DataType;

/**
 * Class MagentoWidget
 *
 */
class MagentoWidget extends \Magento\Ui\Component\Form\Element\DataType\AbstractDataType
{
    const NAME = 'magentowidget';

    /**
     * Get component name
     *
     * @return string
     */
    public function getComponentName()
    {
        return static::NAME;
    }
}
