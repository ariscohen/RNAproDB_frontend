/**
 * Copyright (c) 2023-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Adam Midlik <midlik@gmail.com>
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Aliaksei Chareshneu <chareshneu.tech@gmail.com>
 */
import { PluginContext } from '../../mol-plugin/context';
import { StateObjectSelector } from '../../mol-state';
import { LoadingExtension } from './load-generic';
import { AnnotationFromSourceKind, AnnotationFromUriKind } from './load-helpers';
import { MVSData } from './mvs-data';
import { MolstarNode, MolstarNodeParams, MolstarTree } from './tree/molstar/molstar-tree';
export interface MVSLoadOptions {
    replaceExisting?: boolean;
    keepCamera?: boolean;
    keepSnapshotCamera?: boolean;
    extensions?: MolstarLoadingExtension<any>[];
    sanityChecks?: boolean;
    sourceUrl?: string;
    doNotReportErrors?: boolean;
}
/** Load a MolViewSpec (MVS) tree into the Mol* plugin.
 * If `options.replaceExisting`, remove all objects in the current Mol* state; otherwise add to the current state.
 * If `options.keepCamera`, ignore any camera positioning from the MVS state and keep the current camera position instead.
 * If `options.keepSnapshotCamera`, ignore any camera positioning when generating snapshots.
 * If `options.sanityChecks`, run some sanity checks and print potential issues to the console.
 * If `options.extensions` is provided, apply specified set of MVS-loading extensions (not a part of standard MVS specification); default: apply all builtin extensions; use `extensions: []` to avoid applying builtin extensions.
 * `options.sourceUrl` serves as the base for resolving relative URLs/URIs and may itself be relative to the window URL. */
export declare function loadMVS(plugin: PluginContext, data: MVSData, options?: MVSLoadOptions): Promise<void>;
/** Mutable context for loading a `MolstarTree`, available throughout the loading. */
export interface MolstarLoadingContext {
    /** Maps `*_from_[uri|source]` nodes to annotationId they should reference */
    annotationMap: Map<MolstarNode<AnnotationFromUriKind | AnnotationFromSourceKind>, string>;
    /** Maps each node (on 'structure' or lower level) to its nearest 'representation' node */
    nearestReprMap?: Map<MolstarNode, MolstarNode<'representation'>>;
    camera: {
        cameraParams?: MolstarNodeParams<'camera'>;
        focuses: {
            target: StateObjectSelector;
            params: MolstarNodeParams<'focus'>;
        }[];
    };
    canvas?: MolstarNodeParams<'canvas'>;
}
export declare const MolstarLoadingContext: {
    create(): MolstarLoadingContext;
};
export type MolstarLoadingExtension<TExtensionContext> = LoadingExtension<MolstarTree, MolstarLoadingContext, TExtensionContext>;
export declare const BuiltinLoadingExtensions: MolstarLoadingExtension<any>[];
