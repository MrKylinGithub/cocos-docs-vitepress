# 物理与碰撞系统

本章节主要介绍 2D 物理与碰撞系统，3D 相关的部分请参考 [3D 物理与碰撞系统](../physics-3d/index.md)。

Creator 里的 2D 物理与碰撞系统包括两个部分：

- [碰撞系统](collision/index.md)
- [Box2D 物理引擎](physics/index.md)

对于物理计算较为简单的情况，我们推荐开发者直接使用碰撞组件，这样可以避免加载物理引擎并构建物理世界的运行时开销。而物理引擎提供了更完善的交互接口和刚体、关节等已经预设好的组件。可以根据需要来选择适合自己的物理系统。
