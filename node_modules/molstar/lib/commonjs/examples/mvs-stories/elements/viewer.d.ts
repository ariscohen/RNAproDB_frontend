/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
import { PluginComponent } from '../../../mol-plugin-state/component';
import { PluginContext } from '../../../mol-plugin/context';
import { MolComponentContext } from '../context';
export declare class MolComponentViewerModel extends PluginComponent {
    private options?;
    readonly context: MolComponentContext;
    plugin?: PluginContext;
    mount(root: HTMLElement): Promise<void>;
    constructor(options?: {
        context?: {
            name?: string;
            container?: object;
        };
        name?: string;
    } | undefined);
}
export declare class MolComponentViewer extends HTMLElement {
    private model;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    constructor();
}
