# Summary

## User Manual 3.5

- [Cocos Creator 3.5](index.md)

## Beginners Guide

- [Basic Usage](getting-started/index.md)
    - [About Cocos Creator](getting-started/introduction/index.md)
    - [Installing and Launching](getting-started/install/index.md)
    - [Dashboard](getting-started/dashboard/index.md)
    - [Hello World!](getting-started/helloworld/index.md)
    - [Project Structure](getting-started/project-structure/index.md)
    - [Editor Panels](editor/index.md)
        - [Scene](editor/scene/index.md)
        - [Hierarchy](editor/hierarchy/index.md)
        - [Assets](editor/assets/index.md)
        - [Inspector](editor/inspector/index.md)
        - [Console](editor/console/index.md)
        - [Preferences](editor/preferences/index.md)
        - [Project Settings](editor/project/index.md)
        - [Main Menu](editor/mainMenu/index.md)
        - [Tool Bar](editor/toolbar/index.md)
        - [Editor Layout](editor/editor-layout/index.md)
        - [Preview & Debugging](editor/preview/index.md)
    - [Support](getting-started/support.md)
    - [Caution!](getting-started/attention/index.md)
- [Quick Start: First Game](getting-started/first-game/index.md)
- [Upgrade Guide](release-notes/index.md)
    - [Cocos Creator 3.0 Upgrade Guide](release-notes/upgrade-guide-v3.0.md)
    - [Cocos Creator 3.0 Material Upgrade Guide](material-system/effect-2.x-to-3.0.md)
    - [Cocos Creator 3.1 Material Upgrade Guide](material-system/Material-upgrade-documentation-for-v3.0-to-v3.1.md)
    - [Cocos Creator 3.5 Material Upgrade Guide](material-system/effect-upgrade-documentation-for-v3.4.2-to-v3.5.md)
    - [Cocos Creator 3.5 Native Built Project Upgrade Guide](engine/template/native-upgrade-to-v3.5.md)

## Basic Workflow

- [Scene Creation](concepts/scene/index.md)
    - [Scene Assets](asset/scene.md)
    - [Nodes and Components](concepts/scene/node-component.md)
    - [Coordinate Systems and Transformations](concepts/scene/coord.md)
    - [Node Hierarchy and Rendering Order](concepts/scene/node-tree.md)
    - [Build a Scene Image Using the Scene Panel](concepts/scene/scene-editing.md)

- [Asset System](asset/index.md)
    - [Asset Workflow](asset/asset-workflow.md)
    - [Images](asset/image.md)
        - [Textures](asset/texture.md)
        - [Sprite Frames](asset/sprite-frame.md)
            - [Auto Trim for SpriteFrame](ui-system/components/engine/trim.md)
        - [Texture Cube](asset/texture-cube.md)
        - [Atlas](asset/atlas.md)
        - [Auto Atlas](asset/auto-atlas.md)
        - [Label Atlas](asset/label-atlas.md)
    - [Prefab](asset/prefab.md)
    - [Fonts](asset/font.md)
    - [Audio](asset/audio.md)
    - [Material](asset/material.md)
        - [FBX Smart Material Conversion](importer/materials/fbx-materials.md)
    - [Model](asset/model/mesh.md)
        - [Importing Models Exported from DCC Tools](asset/model/dcc-export-mesh.md)
        - [glTF](asset/model/glTF.md)
    - [Spine Skeletal Animation](asset/spine.md)
    - [DragonBones Skeletal Animation](asset/dragonbones.md)
    - [TiledMap](asset/tiledmap.md)

- [Scripting Guide and Event System](scripting/index.md)
    - [Programming Language Support](scripting/language-support.md)
    - [Scripting Basics](scripting/script-basics.md)
        - [Script Creation](scripting/setup.md)
        - [Coding Environment Setup](scripting/coding-setup.md)
        - [Operating Environment](scripting/basic.md)
        - [Decorator](scripting/decorator.md)
        - [Property Attributes](scripting/reference/attributes.md)
        - [Life Cycle Callbacks](scripting/life-cycle-callbacks.md)
    - [Using Scripts](scripting/usage.md)
        - [Access Nodes and Components](scripting/access-node-component.md)
        - [Common Node and Component Interfaces](scripting/basic-node-api.md)
        - [Create and Destroy Nodes](scripting/create-destroy.md)
        - [Scheduler](scripting/scheduler.md)
        - [Components and Component Execution Order](scripting/component.md)
        - [Loading and Switching Scenes](scripting/scene-managing.md)
        - [Obtaining and Loading Assets](scripting/load-assets.md)
        - [tsconfig Configuration](scripting/tsconfig.md)
    - [Advanced Scripting](scripting/reference-class.md)
    - [Events](engine/event/index.md)
        - [Listening to and Launching Events](engine/event/event-emit.md)
        - [Input Event System](engine/event/event-input.md)
        - [Node Event System](engine/event/event-node.md)
        - [Event API](engine/event/event-api.md)
    - [Modules](scripting/modules/index.md)
        - [Engine Modules](scripting/modules/engine.md)
        - [External Module Usage Case](scripting/modules/example.md)
        - [Module Specification](scripting/modules/spec.md)
        - [Import Maps](scripting/modules/import-map.md)
    - [Plugin Scripts](scripting/external-scripts.md)

- [Cross-platform Game Publish](editor/publish/index.md)
    - [About the Build Panel](editor/publish/build-panel.md)
    - [General Build Options](editor/publish/build-options.md)
    - [Publish to Web Platforms](editor/publish/publish-web.md)
    - [Publish to Native Platforms](editor/publish/native-options.md)
        - [Publish for the Huawei HarmonyOS](editor/publish/publish-huawei-ohos.md)
        - [Setup Native Development](editor/publish/setup-native-development.md)
        - [Debugging JavaScript on Native Platforms](editor/publish/debug-jsb.md)
    - [Publish to Mini Game Platforms](editor/publish/publish-mini-game.md)
        - [Publish to HUAWEI AppGallery Connect](editor/publish/publish-huawei-agc.md)
        - [Publish to Alipay Mini Game](editor/publish/publish-alipay-mini-game.md)
        - [Publish to ByteDance Mini Game](editor/publish/publish-bytedance-mini-game.md)
        - [Publish to Huawei Quick Game](editor/publish/publish-huawei-quick-game.md)
        - [Publish to OPPO Mini Game](editor/publish/publish-oppo-mini-game.md)
        - [Publish to vivo Mini Game](editor/publish/publish-vivo-mini-game.md)
        - [Publish to Xiaomi Quick Game](editor/publish/publish-xiaomi-quick-game.md)
        - [Publish to Baidu Mini Game](editor/publish/publish-baidu-mini-game.md)
        - [Publish to WeChat Mini Game](editor/publish/publish-wechatgame.md)
            - [WeChat Engine Plugin](editor/publish/wechatgame-plugin.md)
            - [Access to the WeChat PC Mini Game](editor/publish/publish-pc-wechatgame.md)
        - [Access to Open Data Context](editor/publish/build-open-data-context.md)
        - [Mini Game Subpackage](editor/publish/subpackage.md)
    - [Publish from the Command Line](editor/publish/publish-in-command-line.md)
    - [Build Process with FAQ](editor/publish/build-guide.md)
    - [Custom Project Build Process](editor/publish/custom-project-build-template.md)

## Function Modules

- [Graphics Rendering](module-map/graphics.md)
    - [Render Pipeline](render-pipeline/overview.md)
        - [Built-in Render Pipeline](render-pipeline/builtin-pipeline.md)
    - [Camera](editor/components/camera-component.md)
    - [Lighting](concepts/scene/light.md)
        - [Physically Based Lighting](concepts/scene/light/pbr-lighting.md)
        - [Lights](concepts/scene/light/lightType/index.md)
            - [Directional Lights](concepts/scene/light/lightType/dir-light.md)
            - [Spherical Lights](concepts/scene/light/lightType/sphere-light.md)
            - [Spotlights](concepts/scene/light/lightType/spot-light.md)
            - [Ambient Light](concepts/scene/light/lightType/ambient.md)
        - [Additive Per-Pixel Lights](concepts/scene/light/additive-per-pixel-lights.md)
        - [Shadows](concepts/scene/light/shadow.md)
        - [Lightmapping](concepts/scene/light/lightmap.md)
    - [Meshes](module-map/mesh/index.md)
        - [MeshRenderer](engine/renderable/model-component.md)
    - [Textures](module-map/texture/index.md)
        - [Texture Compression](asset/compress-texture.md)
        - [RenderTexture](asset/render-texture.md)
    - [Material System Overview](material-system/overview.md)
        - [Programmatic Use of Materials](material-system/material-script.md)
        - [Builtin Materials](material-system/builtin-material.md)
        - [Material System Classes Diagram](material-system/material-structure.md)
    - [Shader Overview](shader/index.md)
        - [Effect Asset](shader/effect-inspector.md)
        - [Effect Syntax Guide](shader/effect-syntax.md)
            - [Optional Pass Parameters](shader/pass-parameter-list.md)
            - [YAML 101](shader/yaml-101.md)
            - [Introduction to GLSL Syntax](shader/glsl.md)
            - [Preprocessor Macro Definition](shader/macros.md)
            - [Effect Chunk](shader/effect-chunk-index.md)
                - [Built-in Shader Uniforms](shader/uniform.md)
        - [Built-in Effect](shader/effect-builtin.md)
            - [Physically Based Rendering - PBR](shader/effect-builtin-pbr.md)
            - [Toon Shading](shader/effect-builtin-toon.md)
            - [Unlit](shader/effect-builtin-unlit.md)
        - [Custom effect](shader/write-effect-overview.md)
            - [3D Effect：RimLight](shader/write-effect-3d-rim-light.md)
            - [2D Sprite effect：Gradient](shader/write-effect-2d-sprite-gradient.md)
    - [Effects](module-map/effects/index.md)
        - [Billboard](particle-system/billboard-component.md)
        - [Line](particle-system/line-component.md)
    - [Skybox](concepts/scene/skybox.md)
    - [Global Fog](concepts/scene/fog.md)

- [2D Objects](2d-object/index.md)
    - [2D Render](2d-object/2d-render/index.md)
        - [Rendering Order](ui-system/components/engine/priority.md)
        - [2D Renderable Component Batching Rules](ui-system/components/engine/ui-batch.md)
        - [Custom Materials for 2D Rendering Objects](ui-system/components/engine/ui-material.md)
        - [2D Renderable Components](ui-system/components/editor/render-component.md)
            - [Sprite Component Reference](ui-system/components/editor/sprite.md)
            - [Label Component Reference](ui-system/components/editor/label.md)
            - [Mask Component Reference](ui-system/components/editor/mask.md)
            - [Graphics Component Reference](ui-system/components/editor/graphics.md)
            - [RichText Component Reference](ui-system/components/editor/richtext.md)
            - [UIStaticBatch Component Reference](ui-system/components/editor/ui-static.md)
            - [Spine Skeleton Component Reference](editor/components/spine.md)
            - [DragonBones ArmatureDisplay Component Reference](editor/components/dragonbones.md)
            - [TiledMap Component Reference](editor/components/tiledmap.md)
            - [TiledTile Component Reference](editor/components/tiledtile.md)
            - [MotionStreak Component Reference](editor/components/motion-streak.md)
    - [UI System](2d-object/ui-system/index.md)
        - [UI Components](ui-system/components/editor/base-component.md)
            - [Canvas Component Reference](ui-system/components/editor/canvas.md)
            - [UITransform Component Reference](ui-system/components/editor/ui-transform.md)
            - [Widget Component Reference](ui-system/components/editor/widget.md)
            - [Button Component Reference](ui-system/components/editor/button.md)
            - [Layout Component Reference](ui-system/components/editor/layout.md)
            - [EditBox Component Reference](ui-system/components/editor/editbox.md)
            - [ScrollView Component Reference](ui-system/components/editor/scrollview.md)
            - [ScrollBar Component Reference](ui-system/components/editor/scrollbar.md)
            - [ProgressBar Component Reference](ui-system/components/editor/progress.md)
            - [LabelOutline Component Reference](ui-system/components/editor/label-outline.md)
            - [LabelShadow Component Reference](ui-system/components/editor/label-shadow.md)
            - [Toggle Component Reference](ui-system/components/editor/toggle.md)
            - [ToggleContainer Component Reference](ui-system/components/editor/toggleContainer.md)
            - [Slider Component Reference](ui-system/components/editor/slider.md)
            - [PageView Component Reference](ui-system/components/editor/pageview.md)
            - [PageViewIndicator Component Reference](ui-system/components/editor/pageviewindicator.md)
            - [UIMeshRenderer Component Reference](ui-system/components/editor/ui-model.md)
            - [UICoordinateTracker Component Reference](ui-system/components/editor/ui-coordinate-tracker.md)
            - [UIOpacity Component Reference](ui-system/components/editor/ui-opacity.md)
            - [BlockInputEvents Component Reference](ui-system/components/editor/block-input-events.md)
            - [WebView Component Reference](ui-system/components/editor/webview.md)
            - [VideoPlayer Component Reference](ui-system/components/editor/videoplayer.md)
            - [SafeArea Component Reference](ui-system/components/editor/safearea.md)
        - [UI Practice Guide](ui-system/components/engine/usage-ui.md)
            - [Multi-Resolution Adaption](ui-system/components/engine/multi-resolution.md)
            - [Widget Alignment](ui-system/components/engine/widget-align.md)
            - [Label Layout](ui-system/components/engine/label-layout.md)
            - [Auto Layout Container](ui-system/components/engine/auto-layout.md)
            - [Create a List of Dynamically Generated Content](ui-system/components/engine/list-with-data.md)
            - [Stretchable UI Sprite](ui-system/components/engine/sliced-sprite.md)

- [Animation](animation/index.md)
    - [Animation Clip](animation/animation-clip.md)
    - [Animation Component Reference](animation/animation-comp.md)
    - [Animation Panel](animation/animation.md)
        - [Creating Animation Components and Animation Clips](animation/animation-create.md)
        - [Get Familiar with the Animation Panel](animation/animation-editor.md)
        - [Editing Animation Clips](animation/edit-animation-clip.md)
        - [Editing Animation Easing Curve](animation/animation-curve.md)
        - [Adding Animation Events](animation/animation-event.md)
        - [Using Animation Curves](animation/use-animation-curve.md)
    - [Skeletal Animation](animation/skeletal-animation.md)
        - [Joint Texture Layout Settings](animation/joint-texture-layout.md)
    - [Controlling Animation with Scripts](animation/animation-component.md)
        - [Animation State](animation/animation-state.md)
    - [Marionette Animation System](animation/marionette/index.md)
        - [Animation Graph Assets](animation/marionette/animation-graph.md)
        - [Animation Graph Panel](animation/marionette/animation-graph-panel.md)
        - [Animation State Machine](animation/marionette/animation-graph-basics.md)
        - [State Transition](animation/marionette/state-transition.md)

- [Audio System](audio-system/overview.md)
    - [AudioSource Component Reference](audio-system/audiosource.md)
    - [AudioSource Playback Example](audio-system/audioExample.md)
    - [Compatibility Notes](audio-system/audioLimit.md)

- [Physics System](physics/index.md)
    - [Physics 2D](physics-2d/physics-2d.md)
        - [2D Physics Manager](physics-2d/physics-2d-system.md)
        - [2D RigidBody](physics-2d/physics-2d-rigid-body.md)
        - [2D Physics Collider](physics-2d/physics-2d-collider.md)
        - [2D Contact Callback](physics-2d/physics-2d-contact-callback.md)
        - [2D Physics Joint](physics-2d/physics-2d-joint.md)
    - [Physics 3D](physics/physics.md)
        - [Physics Engines](physics/physics-engine.md)
        - [Physics System Configuration](physics/physics-configs.md)
        - [Group and Mask](physics/physics-group-mask.md)
        - [Physics Components](physics/physics-component.md)
            - [Collider](physics/physics-collider.md)
            - [Rigidbody](physics/physics-rigidbody.md)
            - [Constant Force](physics/physics-constantForce.md)
            - [Constraint](physics/physics-constraint.md)
        - [Physics Material](physics/physics-material.md)
        - [Physics Event](physics/physics-event.md)
        - [Raycast Detection](physics/physics-raycast.md)
        - [Continuous Collision Detection](physics/physics-ccd.md)
        - [Physics Application Cases](physics/physics-example.md)

- [Particle System](particle-system/index.md)
    - [2D Particle System](particle-system/2d-particle/2d-particle.md)
    - [3D Particle System](particle-system/overview.md)
        - [Particle System Module](particle-system/module.md)
            - [Main Module](particle-system/main-module.md)
            - [Shape Module](particle-system/emitter.md)
            - [Velocity Overtime Module](particle-system/velocity-module.md)
            - [Force Overtime Module](particle-system/force-module.md)
            - [Size Overtime Module](particle-system/size-module.md)
            - [Rotation Overtime Module](particle-system/rotation-module.md)
            - [Color Over Life Time Module](particle-system/color-module.md)
            - [Texture Animation Module](particle-system/texture-animation-module.md)
            - [Limit Velocity Overtime Module](particle-system/limit-velocity-module.md)
            - [Trail Module](particle-system/trail-module.md)
            - [Renderer Module](particle-system/renderer.md)
        - [Particle Properties Editor](particle-system/editor/index.md)
            - [Curve Editor](particle-system/editor/curve-editor.md)
            - [Gradient Editor](particle-system/editor/gradient-editor.md)
            - [Particle Editor](particle-system/editor/particle-effect-panel.md)

- [Tween System](tween/index.md)
    - [Tween Interface](tween/tween-interface.md)
    - [Tween Function](tween/tween-function.md)
    - [Tween Examples](tween/tween-example.md)

- [Terrain System](editor/terrain/index.md)

- [Asset Manager](asset/asset-manager.md)
    - [AssetManager Upgrade Guide](asset/asset-manager-upgrade-guide.md)
    - [Asset Bundle Upgrade Guide](asset/subpackage-upgrade-guide.md)
    - [Asset Loading](asset/dynamic-load-resources.md)
    - [Asset Bundle](asset/bundle.md)
    - [Release Of Assets](asset/release-manager.md)
    - [Download and Parse](asset/downloader-parser.md)
    - [Loading and Preloading](asset/preload-load.md)
    - [Cache Manager](asset/cache-manager.md)
    - [Optional Parameters](asset/options.md)
    - [Pipeline and Task](asset/pipeline-task.md)
    - [Resource Management Considerations --- meta files](asset/meta.md)

## Advanced Tutorials

- [Editor Extension](editor/extension/readme.md)
    - [Extension Manager](editor/extension/extension-manager.md)
    - [Extension Templates and Compile Builds](editor/extension/create-extension.md)
    - [Getting Started Example - Menu](editor/extension/first.md)
    - [Getting Started Example - Panel](editor/extension/first-panel.md)
    - [Getting Started Example - First Data Interaction](editor/extension/first-communication.md)
    - [Change the Name of a Extension](editor/extension/extension-change-name.md)
    - [Install and Share](editor/extension/install.md)
    - [Submitting Resources to Cocos Store](editor/extension/store/upload-store.md)
    - [Extend Existing Functionality](editor/extension/contributions.md)
        - [Customize the Main Menu](editor/extension/contributions-menu.md)
        - [Customized Messages](editor/extension/contributions-messages.md)
        - [Calling the Engine API and Project Script](editor/extension/scene-script.md)
        - [Extending the Assets Panel](editor/assets/extension.md)
        - [Custom Asset Database](editor/extension/contributions-database.md)
        - [Custom Inspector Panel](editor/extension/inspector.md)
        - [Extending Build Process](editor/publish/custom-build-plugin.md)
        - [Extending Project Settings Panel](editor/extension/contributions-project.md)
        - [Extending the Preferences Panels](editor/extension/contributions-preferences.md)
        - [Extending Shortcut](editor/extension/contributions-shortcuts.md)
    - [Extension Details](editor/extension/basic.md)
        - [Extension Infrastructure](editor/extension/package.md)
        - [Definition of Extension](editor/extension/define.md)
        - [Message System](editor/extension/messages.md)
        - [Multilingual System (i18n)](editor/extension/i18n.md)
        - [Configuration System](editor/extension/profile.md)
        - [Extension Panel](editor/extension/panel.md)
        - [UI Components](editor/extension/ui.md)
- [Advanced Topics](advanced-topics/index.md)
    - [Hot Update Tutorial](advanced-topics/hot-update.md)
    - [AssetManager for Hot Update](advanced-topics/hot-update-manager.md)
    - [Dynamic Atlas](advanced-topics/dynamic-atlas.md)
    - [Engine Customization Workflow](advanced-topics/engine-customization.md)
    - [Web Preview Customization Workflow](editor/preview/browser.md)
    - [The Tutorial for JSB 2.0](advanced-topics/JSB2.0-learning.md)
    - [JavaScript to Java Reflection](advanced-topics/js-java-bridge.md)
    - [JavaScript to Objective-C Reflection](advanced-topics/js-oc-bridge.md)
    - [Event Mecanism based on JsbBridge](advanced-topics/jsb-bridge-wrapper.md)
    - [CMake Usage Introduction](advanced-topics/cmake-learning.md)
    - [Native engine memory leak detection system](advanced-topics/memory-leak-detector.md)
    - [Native Scene Culling](advanced-topics/native-scene-culling.md)
    - WebSocket
        - [WebSocket Server](advanced-topics/websocket-server.md)
        - [WebSocket Client](advanced-topics/websocket.md)