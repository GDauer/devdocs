<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Magento\PageBuilder\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;;
use Magento\Framework\App\Filesystem\DirectoryList;

/**
 * Migrates images from old bluefoot directory to new pagebuilder directory
 */
class MigrateImagesToPageBuilder implements DataPatchInterface
{
    /**
     * @var \Magento\Framework\Filesystem
     */
    private $filesystem;

    /**
     * @var \Magento\Framework\Filesystem\Driver\File
     */
    private $fileDriver;

    /**
     * @var DirectoryList
     */
    private $directoryList;

    /**
     * @var \Psr\Log\LoggerInterface
     */
    private $logger;

    /**
     * @param \Magento\Framework\Filesystem $filesystem
     */
    public function __construct(
        \Magento\Framework\Filesystem $filesystem,
        \Magento\Framework\Filesystem\Driver\File $fileDriver,
        \Magento\Framework\App\Filesystem\DirectoryList $directoryList,
        \Psr\Log\LoggerInterface $logger
    ) {
        $this->filesystem = $filesystem;
        $this->fileDriver = $fileDriver;
        $this->directoryList = $directoryList;
        $this->logger = $logger;
    }

    /**
     * Do Upgrade
     *
     * @return void
     */
    public function apply(): void
    {
        // check if /pub/media/gene-cms is readable
        $bluefootImagesPath = $this->directoryList->getPath('media') . DIRECTORY_SEPARATOR . 'gene-cms';
        $bluefootDir = $this->filesystem->getDirectoryReadByPath($bluefootImagesPath);
        if (!$bluefootDir->isReadable()) {
            $this->createAndLogException('The path "%1" is not readable.', $bluefootDir);
            return;
        }

        // check if /pub/media/wysiwyg is writable
        $pagebuilderImagesPath = $this->directoryList->getPath('media') . DIRECTORY_SEPARATOR . 'wysiwyg';
        $pagebuilderDir = $this->filesystem->getDirectoryWrite(DirectoryList::MEDIA);
        if (!$pagebuilderDir->isWritable()) {
            $this->createAndLogException('The path "%1" is not writable.', $pagebuilderDir);
            return;
        }

        // move images
        $allFiles = $bluefootDir->readRecursively();
        foreach ($allFiles as $file) {
            if ($bluefootDir->isFile($file)) {
                try {
                    $this->fileDriver->rename(
                        $bluefootImagesPath . DIRECTORY_SEPARATOR . $file,
                        $pagebuilderImagesPath . DIRECTORY_SEPARATOR . basename($file)
                    );
                } catch (\Exception $e) {
                    $this->logger->critical($e);
                }
            }
        }
    }

    /**
     * Create exception and log
     *
     * @param string $message
     * @param array $path
     * @return void
     */
    private function createAndLogException(string $message, array $path): void
    {
        $e = new \Magento\Framework\Exception\FileSystemException(new \Magento\Framework\Phrase($message, [$path]));
        $this->logger->critical($e);
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases(): array
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public static function getDependencies(): array
    {
        return [MigrateToPageBuilder::class];
    }
}
