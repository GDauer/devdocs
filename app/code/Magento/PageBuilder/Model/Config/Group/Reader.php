<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Magento\PageBuilder\Model\Config\Group;

class Reader extends \Magento\Framework\Config\Reader\Filesystem
{
    /**
     * List of id attributes for merge
     *
     * @var array
     */
    protected $_idAttributes = [
        '/config/group' => 'name'
    ];

    /**
     * Constructor
     *
     * @param \Magento\PageBuilder\Model\Config\FileResolver $fileResolver
     * @param \Magento\PageBuilder\Model\Config\Group\Converter $converter
     * @param \Magento\PageBuilder\Model\Config\Group\SchemaLocator $schemaLocator
     * @param \Magento\Framework\Config\ValidationStateInterface $validationState
     * @param string $fileName
     * @param array $idAttributes
     * @param string $domDocumentClass
     * @param string $defaultScope
     */
    public function __construct(
        \Magento\PageBuilder\Model\Config\FileResolver $fileResolver,
        \Magento\PageBuilder\Model\Config\Group\Converter $converter,
        \Magento\PageBuilder\Model\Config\Group\SchemaLocator $schemaLocator,
        \Magento\Framework\Config\ValidationStateInterface $validationState,
        string $fileName = 'group.xml',
        array $idAttributes = [],
        string $domDocumentClass = \Magento\Framework\Config\Dom::class,
        string $defaultScope = 'global'
    ) {
        parent::__construct(
            $fileResolver,
            $converter,
            $schemaLocator,
            $validationState,
            $fileName,
            $idAttributes,
            $domDocumentClass,
            $defaultScope
        );
    }
}
