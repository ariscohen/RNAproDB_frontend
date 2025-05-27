/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
import { BehaviorSubject } from 'rxjs';
import { MVSData } from '../../extensions/mvs/mvs-data';
import type { MolComponentViewerModel } from './elements/viewer';
export type MolComponentCommand = {
    kind: 'load-mvs';
    format?: 'mvsj' | 'mvsx';
    url?: string;
    data?: MVSData;
};
export declare class MolComponentContext {
    name?: string | undefined;
    commands: BehaviorSubject<{
        kind: "load-mvs";
        format?: "mvsj" | "mvsx";
        url?: string;
        data?: MVSData;
    } | undefined>;
    behavior: {
        viewers: BehaviorSubject<{
            name?: string;
            model: MolComponentViewerModel;
        }[]>;
    };
    dispatch(command: MolComponentCommand): void;
    constructor(name?: string | undefined);
}
export declare function getMolComponentContext(options?: {
    name?: string;
    container?: object;
}): any;
