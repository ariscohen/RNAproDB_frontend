"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolComponentViewer = exports.MolComponentViewerModel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
const behavior_1 = require("../../../extensions/mvs/behavior");
const load_1 = require("../../../extensions/mvs/load");
const mvs_data_1 = require("../../../extensions/mvs/mvs-data");
const component_1 = require("../../../mol-plugin-state/component");
const mol_plugin_ui_1 = require("../../../mol-plugin-ui");
const react18_1 = require("../../../mol-plugin-ui/react18");
const spec_1 = require("../../../mol-plugin-ui/spec");
const config_1 = require("../../../mol-plugin/config");
const spec_2 = require("../../../mol-plugin/spec");
const context_1 = require("../context");
class MolComponentViewerModel extends component_1.PluginComponent {
    async mount(root) {
        var _a;
        const spec = (0, spec_1.DefaultPluginUISpec)();
        this.plugin = await (0, mol_plugin_ui_1.createPluginUI)({
            target: root,
            render: react18_1.renderReact18,
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
                    spec_2.PluginSpec.Behavior(behavior_1.MolViewSpec)
                ],
                config: [
                    [config_1.PluginConfig.Viewport.ShowAnimation, false],
                ]
            }
        });
        this.subscribe(this.context.commands, async (cmd) => {
            if (!cmd)
                return;
            if (cmd.kind === 'load-mvs') {
                if (cmd.url) {
                    const data = await this.plugin.runTask(this.plugin.fetch({ url: cmd.url, type: 'string' }));
                    const mvsData = mvs_data_1.MVSData.fromMVSJ(data);
                    await (0, load_1.loadMVS)(this.plugin, mvsData, { sanityChecks: true, sourceUrl: cmd.url, replaceExisting: true });
                }
                else if (cmd.data) {
                    await (0, load_1.loadMVS)(this.plugin, cmd.data, { sanityChecks: true, replaceExisting: true });
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
        this.context = (0, context_1.getMolComponentContext)(options === null || options === void 0 ? void 0 : options.context);
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
exports.MolComponentViewerModel = MolComponentViewerModel;
function EmptyDescription() {
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
}
class MolComponentViewer extends HTMLElement {
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
exports.MolComponentViewer = MolComponentViewer;
window.customElements.define('mc-viewer', MolComponentViewer);
