/**
 * Copyright (c) 2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Ludovic Autin <ludovic.autin@gmail.com>
 */
import { Task } from '../../../../mol-task';
import { ReaderResult as Result } from '../../result';
import { LammpsDataFile } from '../schema';
export declare function parseLammpsData(data: string): Task<Result<LammpsDataFile>>;
