/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import loadModule from "Magento_PageBuilder/js/utils/loader";
import ContentTypeConfigInterface from "../content-type-config.d";
import ContentTypeInterface from "../content-type.d";
import converterResolver from "./converter-resolver";
import Master from "./master";
import MasterCollection from "./master-collection";
import observableUpdaterFactory from "./observable-updater-factory";

/**
 * Create new content instance
 *
 * @param {ContentTypeInterface} contentType
 * @param {ContentTypeConfigInterface} config
 * @returns {Promise<ContentTypeInterface>}
 * @api
 */
export default function create(
    contentType: ContentTypeInterface,
    config: ContentTypeConfigInterface,
): Promise<typeof Master | typeof MasterCollection> {
    return new Promise((resolve: (masterComponent: any) => void) => {
        observableUpdaterFactory(config, converterResolver).then((observableUpdater) => {
            loadModule([config.master_component], (contentComponent: typeof Master | typeof MasterCollection) => {
                resolve(
                    new contentComponent(
                        contentType,
                        observableUpdater,
                    ),
                );
            });
        }).catch((error) => {
            console.error(error);
        });
    });
}