/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
import { BehaviorSubject } from 'rxjs';
import { PluginComponent } from '../../../mol-plugin-state/component';
import { MolComponentContext } from '../context';
import { MolComponentViewerModel } from './viewer';
import { PluginStateSnapshotManager } from '../../../mol-plugin-state/manager/snapshots';
export declare class MolComponentSnapshotMarkdownModel extends PluginComponent {
    private options?;
    readonly context: MolComponentContext;
    root: HTMLElement | undefined;
    state: BehaviorSubject<{
        entry?: PluginStateSnapshotManager.Entry;
        index?: number;
        all: PluginStateSnapshotManager.Entry[];
    }>;
    get viewer(): {
        name?: string;
        model: MolComponentViewerModel;
    } | undefined;
    sync(): void;
    mount(root: HTMLElement): Promise<void>;
    constructor(options?: {
        context?: {
            name?: string;
            container?: object;
        };
        viewerName?: string;
    } | undefined);
}
export declare function MolComponentSnapshotMarkdownUI({ model }: {
    model: MolComponentSnapshotMarkdownModel;
}): import("react/jsx-runtime").JSX.Element;
export declare class MolComponentSnapshotMarkdownViewer extends HTMLElement {
    private model;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    constructor();
}
