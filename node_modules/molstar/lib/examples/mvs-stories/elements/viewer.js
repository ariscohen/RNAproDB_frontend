import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
import { MolViewSpec } from '../../../extensions/mvs/behavior';
import { loadMVS } from '../../../extensions/mvs/load';
import { MVSData } from '../../../extensions/mvs/mvs-data';
import { PluginComponent } from '../../../mol-plugin-state/component';
import { createPluginUI } from '../../../mol-plugin-ui';
import { renderReact18 } from '../../../mol-plugin-ui/react18';
import { DefaultPluginUISpec } from '../../../mol-plugin-ui/spec';
import { PluginConfig } from '../../../mol-plugin/config';
import { PluginSpec } from '../../../mol-plugin/spec';
import { getMolComponentContext } from '../context';
export class MolComponentViewerModel extends PluginComponent {
    async mount(root) {
        var _a;
        const spec = DefaultPluginUISpec();
        this.plugin = await createPluginUI({
            target: root,
            render: renderReact18,
            spec: {
                ...spec,
                layout: {
                    initial: {
                        isExpanded: false,
                        showControls: false,
                        controlsDisplay: 'landscape',
                    },
                },
                components: {
                    remoteState: 'none',
                    viewport: {
                        snapshotDescription: EmptyDescription,
                    }
                },
                behaviors: [
                    ...spec.behaviors,
                    PluginSpec.Behavior(MolViewSpec)
                ],
                config: [
                    [PluginConfig.Viewport.ShowAnimation, false],
                ]
            }
        });
        this.subscribe(this.context.commands, async (cmd) => {
            if (!cmd)
                return;
            if (cmd.kind === 'load-mvs') {
                if (cmd.url) {
                    const data = await this.plugin.runTask(this.plugin.fetch({ url: cmd.url, type: 'string' }));
                    const mvsData = MVSData.fromMVSJ(data);
                    await loadMVS(this.plugin, mvsData, { sanityChecks: true, sourceUrl: cmd.url, replaceExisting: true });
                }
                else if (cmd.data) {
                    await loadMVS(this.plugin, cmd.data, { sanityChecks: true, replaceExisting: true });
                }
            }
        });
        const viewers = this.context.behavior.viewers.value;
        const next = [...viewers, { name: (_a = this.options) === null || _a === void 0 ? void 0 : _a.name, model: this }];
        this.context.behavior.viewers.next(next);
    }
    constructor(options) {
        super();
        this.options = options;
        this.plugin = undefined;
        this.context = getMolComponentContext(options === null || options === void 0 ? void 0 : options.context);
        const viewers = this.context.behavior.viewers.value;
        const index = viewers.findIndex(v => v.name === (options === null || options === void 0 ? void 0 : options.name));
        if (index >= 0) {
            const next = [...viewers];
            next[index].model.dispose();
            next.splice(index, 0);
            this.context.behavior.viewers.next(next);
        }
    }
}
function EmptyDescription() {
    return _jsx(_Fragment, {});
}
export class MolComponentViewer extends HTMLElement {
    async connectedCallback() {
        var _a, _b;
        this.model = new MolComponentViewerModel({
            name: (_a = this.getAttribute('name')) !== null && _a !== void 0 ? _a : undefined,
            context: { name: (_b = this.getAttribute('context-name')) !== null && _b !== void 0 ? _b : undefined },
        });
        await this.model.mount(this);
    }
    disconnectedCallback() {
        var _a;
        (_a = this.model) === null || _a === void 0 ? void 0 : _a.dispose();
        this.model = undefined;
    }
    constructor() {
        super();
        this.model = undefined;
    }
}
window.customElements.define('mc-viewer', MolComponentViewer);
