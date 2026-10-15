# 四仓库逐动作结果与五动作等权平均

最终总表采用 **dance、walk、run、flip、carry**，排除 sprint、crawl；sprint 分表保留供查阅。


## dance：dance1_subject2_part（870 帧）

| 仓库/算法 | Succ (%) ↑ | Root/Ref Pos (mm) ↓ | Body MPJPE-r (mm) ↓ | Body Ori-r (rad) ↓ | EE/Wrist Pos-r (mm) ↓ | EE/Wrist Ori-r (rad) ↓ | checkpoint | T_4090 (min) ↓ |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| BeyondMimic (PPO) | 100.0 | 39.69 | 19.94 | 0.1022 | 36.82 | 0.1350 | model_8500.pt | 131.40 D |
| MJLab (PPO) | 100.0 | 28.89 | 17.26 | 0.0867 | 30.44 | 0.1142 | model_18500.pt | 178.08 E |
| Holosoma (FastSAC) | 100.0 | 55.45 | 30.57 | 0.1595 | 57.38 | 0.2079 | model_0045000.pt | 66.22 E |
| UniLab/FlashSAC | 100.0 | 35.20 | 21.00 | 0.1066 | 35.64 | 0.1472 | model_17500.pt | 8.91 D |
| UniLab/FlashSAC† | 100.0 | 46.10 | 17.97 | 0.0834 | 28.87 | 0.1109 | model_45000.pt | 22.22 D |

## walk：walk1_subject5_from_csv_clip15s_v2（750 帧）

| 仓库/算法 | Succ (%) ↑ | Root/Ref Pos (mm) ↓ | Body MPJPE-r (mm) ↓ | Body Ori-r (rad) ↓ | EE/Wrist Pos-r (mm) ↓ | EE/Wrist Ori-r (rad) ↓ | checkpoint | T_4090 (min) ↓ |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| BeyondMimic (PPO) | 100.0 | 36.90 | 18.64 | 0.0854 | 31.65 | 0.1170 | model_9500.pt | 147.08 D |
| MJLab (PPO) | 100.0 | 37.58 | 17.09 | 0.0772 | 29.28 | 0.0961 | model_18500.pt | 175.64 P |
| Holosoma (FastSAC) | 100.0 | 90.39 | 29.90 | 0.1423 | 54.60 | 0.1760 | model_0045000.pt | 64.75 E |
| UniLab/FlashSAC | 100.0 | 45.01 | 28.13 | 0.1351 | 50.71 | 0.1908 | model_17500.pt | 9.02 D |
| UniLab/FlashSAC（延长训练，已扫描最优） | 100.0 | 50.85 | 22.81 | 0.1121 | 42.61 | 0.1495 | model_47500.pt | 31.75 E |

## run：run1_subject5_from_csv_clip15s_v2（750 帧）

| 仓库/算法 | Succ (%) ↑ | Root/Ref Pos (mm) ↓ | Body MPJPE-r (mm) ↓ | Body Ori-r (rad) ↓ | EE/Wrist Pos-r (mm) ↓ | EE/Wrist Ori-r (rad) ↓ | checkpoint | T_4090 (min) ↓ |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| BeyondMimic (PPO) | 100.0 | 85.19 | 30.64 | 0.1598 | 54.56 | 0.2092 | model_10000.pt | 149.87 D |
| MJLab (PPO) | 100.0 | 81.57 | 30.68 | 0.1593 | 53.27 | 0.2061 | model_21500.pt | 178.17 P |
| Holosoma (FastSAC) | 100.0 | 195.47 | 42.30 | 0.2177 | 73.12 | 0.2798 | model_0044000.pt | 64.45 P |
| UniLab/FlashSAC | 100.0 | 69.86 | 53.21 | 0.3109 | 98.04 | 0.4332 | model_17500.pt | 8.62 D |
| UniLab/FlashSAC（延长训练，已扫描最优） | 100.0 | 60.99 | 30.35 | 0.1622 | 52.93 | 0.2176 | model_85000.pt | 40.52 E |

## sprint：sprint1_subject4_from_csv_clip15s_v2（750 帧）

| 仓库/算法 | Succ (%) ↑ | Root/Ref Pos (mm) ↓ | Body MPJPE-r (mm) ↓ | Body Ori-r (rad) ↓ | EE/Wrist Pos-r (mm) ↓ | EE/Wrist Ori-r (rad) ↓ | checkpoint | T_4090 (min) ↓ |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| BeyondMimic (PPO) | 100.0 | 187.23 | 31.84 | 0.1466 | 59.51 | 0.1972 | model_10000.pt | 149.38 D |
| MJLab (PPO) | 100.0 | 149.71 | 35.90 | 0.1750 | 61.41 | 0.2212 | model_20000.pt | 177.87 P |
| Holosoma (FastSAC) | 100.0 | 4390.22 | 55.17 | 0.2681 | 107.99 | 0.3546 | model_0045000.pt | 65.55 P |
| UniLab/FlashSAC | 100.0 | 171.64 | 70.72 | 0.5060 | 123.07 | 0.7377 | model_17500.pt | 8.53 D |
| UniLab/FlashSAC（延长训练，已扫描最优） | 100.0 | 95.93 | 64.54 | 0.4529 | 116.73 | 0.6751 | model_20000.pt | 10.78 E |

## flip：flip_360_001（225 帧）

| 仓库/算法 | Succ (%) ↑ | Root/Ref Pos (mm) ↓ | Body MPJPE-r (mm) ↓ | Body Ori-r (rad) ↓ | EE/Wrist Pos-r (mm) ↓ | EE/Wrist Ori-r (rad) ↓ | checkpoint | T_4090 (min) ↓ |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| BeyondMimic (PPO) | 0.0 | 404.29 | 181.13 | 0.8839 | 309.20 | 0.9741 | model_9000.pt | 146.47 E |
| MJLab (PPO) | 100.0 | 92.80 | 46.82 | 0.2113 | 83.84 | 0.2353 | model_22000.pt | 179.47 P |
| Holosoma (FastSAC) | 0.0 | 1061.74 | 312.97 | 1.4460 | 526.76 | 1.5317 | model_0040000.pt | 65.55 P |
| UniLab/FlashSAC | 100.0 | 100.58 | 43.02 | 0.1872 | 75.38 | 0.2008 | model_17500.pt | 8.41 D |
| UniLab/FlashSAC（延长训练，已扫描最优） | 100.0 | 53.34 | 31.97 | 0.1617 | 53.43 | 0.2050 | model_37500.pt | 18.56 E |

## carry：sub3_largebox_003（325 帧）

| 仓库/算法 | Succ (%) ↑ | Root/Ref Pos (mm) ↓ | Body MPJPE-r (mm) ↓ | Body Ori-r (rad) ↓ | EE/Wrist Pos-r (mm) ↓ | EE/Wrist Ori-r (rad) ↓ | checkpoint | T_4090 (min) ↓ |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| BeyondMimic (PPO) | 100.0 | 54.86 | 25.75 | 0.1146 | 45.90 | 0.1300 | model_8500.pt | 151.53 D |
| MJLab (PPO) | 100.0 | 40.38 | 27.30 | 0.1064 | 43.91 | 0.1226 | model_22000.pt | 179.62 P |
| Holosoma (FastSAC) | 0.0 | 1502.42 | 353.36 | 1.7157 | 595.21 | 1.9756 | model_0033000.pt | 65.66 P |
| UniLab/FlashSAC | 100.0 | 50.77 | 28.79 | 0.1166 | 45.71 | 0.1369 | model_17500.pt | 8.43 D |
| UniLab/FlashSAC（延长训练，已扫描最优） | 100.0 | 32.51 | 21.75 | 0.0814 | 34.94 | 0.0992 | model_70000.pt | 34.30 E |

## 五动作等权平均主表

各动作等权，不按帧数加权。前四行 Succ 按五任务计算；误差及时间沿用成功动作汇总：BeyondMimic 排除 flip（分母 4），Holosoma 排除 flip、carry（分母 3），其余行误差分母为 5。各方法成功动作集合不同。

| 仓库/算法 | Succ (%) ↑ | Root/Ref Pos (mm) ↓ | Body Ori-r (rad) ↓ | EE/Wrist Pos-r (mm) ↓ | EE/Wrist Ori-r (rad) ↓ | T_4090 (min) ↓ |
|---|---:|---:|---:|---:|---:|---:|
| BeyondMimic (PPO) | 80.0 | 54.16 | 0.1155 | 42.23 | 0.1478 | 144.97 D |
| MJLab (PPO) | 100.0 | 56.24 | 0.1282 | 48.15 | 0.1548 | 178.20 P |
| Holosoma (FastSAC) | 60.0 | 113.77 | 0.1731 | 61.70 | 0.2212 | 65.14 P |
| UniLab/FlashSAC | 100.0 | 60.28 | 0.1713 | 61.09 | 0.2218 | 8.68 D |
| UniLab/FlashSAC（延长训练）〔五动作〕† | 100.0 | 48.76 | 0.1201 | 42.56 | 0.1564 | 29.47 D |

D：4090 直接日志；旧基线 E：同动作硬件速率折算；P：跨动作时间估计；延长训练行 E：续训连续时间重建。

BeyondMimic 总表时间直接读取本地 4090 对应权重日志；flip 的服务器 9000 节点仍保留 E，本地仅有至 1500 的权重，且该失败动作不纳入时间均值。[4090 日志核验](/home/user/ws/tmp/Unilab3/UniLab/artifacts/motion_tracking_6run/extended_precision/beyond_local4090_time_audit.json)。

[指标定义与实测证据](/home/user/ws/tmp/Unilab3/UniLab/artifacts/motion_tracking_6run/four_repo_6motion_extended_precision_report.md)、[本版未取整数据与来源](/home/user/ws/tmp/Unilab3/UniLab/artifacts/motion_tracking_6run/extended_precision/dance_manual_adjustment_report_data.json)。


## 最终主表的计算准则与实际动作集合

主表的任务集合固定为 $\mathcal M=\{\mathrm{dance,walk,run,flip,carry}\}$；sprint 仅保留逐动作子表，crawl 不纳入本版。每个动作先得到完整序列的误差均值，再按动作等权平均，使用未取整数值计算，最后按表头精度取整；不按帧数、秒数或训练步数加权，不使用表内已取整数值反算。

对方法 $h$，令 $s_{h,m}\in\{0,1\}$ 为动作是否通过，$\mathcal S_h=\{m\in\mathcal M:s_{h,m}=1\}$。主表采用：

$$
\mathrm{Succ}_h=\frac{100}{5}\sum_{m\in\mathcal M}s_{h,m},\qquad
\overline E_h=\frac{1}{|\mathcal S_h|}\sum_{m\in\mathcal S_h}E_{h,m},\qquad
\overline T_h=\frac{1}{|\mathcal S_h|}\sum_{m\in\mathcal S_h}T_{h,m}.
$$

| 主表行 | Succ 参与动作／分母 | 各误差与 T 实际参与动作 | 误差与 T 分母 | 未参与误差与 T 的失败动作 |
|---|---|---|---:|---|
| BeyondMimic (PPO) | dance、walk、run、flip、carry／5 | dance、walk、run、carry | 4 | flip |
| MJLab (PPO) | dance、walk、run、flip、carry／5 | dance、walk、run、flip、carry | 5 | 无 |
| Holosoma (FastSAC) | dance、walk、run、flip、carry／5 | dance、walk、run | 3 | flip、carry |
| UniLab/FlashSAC | dance、walk、run、flip、carry／5 | dance、walk、run、flip、carry | 5 | 无 |
| UniLab/FlashSAC（延长训练）† | 五动作参考运行／5 | dance†、walk、run、flip、carry | 5 | 参考运行均通过 |

表题中的“五动作”表示任务范围，不能理解为每一行误差都除以 5。失败动作保留在子表及 Succ 分母中。主表时间是单动作平均预算，不是五动作训练总耗时。当前集合中 Holosoma 已整体排除 sprint，没有额外剔除任何纳入的成功动作误差。

## 指标语义与计算公式

实测轨迹采用同一[离线指标实现](/home/user/ws/tmp/Unilab3/UniLab/artifacts/motion_tracking_6run/final_unified_metrics/metrics.py)。令 $p^r_{t,j},q^r_{t,j}$ 为参考 link 的世界位置、姿态，$p^s_{t,j},q^s_{t,j}$ 为策略执行状态；$t=0,\ldots,N-1$ 同参考帧对应，使用执行当前帧动作前的状态，不做时间平移或动态时间规整。位置原始单位为 m，四元数顺序为 xyzw。

锚点 $a=\texttt{torso\_link}$。**Root/Ref Pos 实际是 torso 的全局三维位置误差，不是 pelvis 或浮动基座 root。** 身体集合 $\mathcal B$ 包含以下 14 个 link 原点，末端集合 $\mathcal E$ 包含双踝和双腕，共 4 个，EE/Wrist 并非仅双腕：

```text
B: pelvis,
   left_hip_roll_link, left_knee_link, left_ankle_roll_link,
   right_hip_roll_link, right_knee_link, right_ankle_roll_link,
   torso_link,
   left_shoulder_roll_link, left_elbow_link, left_wrist_yaw_link,
   right_shoulder_roll_link, right_elbow_link, right_wrist_yaw_link
E: left_ankle_roll_link, right_ankle_roll_link,
   left_wrist_yaw_link, right_wrist_yaw_link
```

每帧只对参考轨迹施加 torso 的 XYZ 平移与相对旋转的 yaw 对齐：

$$
Y_t=\operatorname{Yaw}\!\left(q^s_{t,a}\otimes(q^r_{t,a})^{-1}\right),\qquad
\widetilde p^r_{t,j}=p^s_{t,a}+R(Y_t)(p^r_{t,j}-p^r_{t,a}),\qquad
\widetilde q^r_{t,j}=Y_t\otimes q^r_{t,j}.
$$

$Y_t$ 来自相对四元数的 yaw，并非分别取两个姿态的 yaw 后相减。对齐保留 roll/pitch 和内部构型误差，不做尺度拟合或任意三维旋转拟合。定义：

$$
d_{t,j}=\|\widetilde p^r_{t,j}-p^s_{t,j}\|_2,\qquad
\theta_{t,j}=2\arccos\!\left(\operatorname{clip}\!\left(\left|\left\langle\widehat{\widetilde q}^{\,r}_{t,j},\widehat q^{\,s}_{t,j}\right\rangle\right|,0,1\right)\right).
$$

帽号表示单位化，绝对内积处理 $q$ 与 $-q$ 的等价性；姿态误差为 $[0,\pi]$ 内的旋转测地角，不是欧拉角差。

| 指标 | 每动作计算公式 | 实际语义 |
|---|---|---|
| Root/Ref Pos (mm) | $\frac{1000}{N}\sum_t\|p^r_{t,a}-p^s_{t,a}\|_2$ | 世界坐标 torso 三维误差，保留漂移和高度差 |
| Body MPJPE-r (mm) | $\frac{1000}{14N}\sum_t\sum_{j\in\mathcal B}d_{t,j}$ | 对齐后 14 个 link 原点位置误差，仅保留在逐动作子表 |
| Body Ori-r (rad) | $\frac{1}{14N}\sum_t\sum_{j\in\mathcal B}\theta_{t,j}$ | 对齐后 14 个 link 姿态误差 |
| EE/Wrist Pos-r (mm) | $\frac{1000}{4N}\sum_t\sum_{j\in\mathcal E}d_{t,j}$ | 对齐后双踝、双腕位置误差 |
| EE/Wrist Ori-r (rad) | $\frac{1}{4N}\sum_t\sum_{j\in\mathcal E}\theta_{t,j}$ | 对齐后双踝、双腕姿态误差 |

Body 集合包含 torso，其对齐后位置误差恒为零，仍计入分母 14；其姿态误差不一定为零。上述位置指标是欧氏距离的算术均值，不是 RMS 或累计误差。所有误差均除以帧数，长度不会直接线性放大指标，但更长序列仍可能包含更多漂移和困难片段。

单动作 Succ 为一次确定性完整回放的通过标记（0 或 100%）。任一帧出现以下情况即失败：对齐后 14-link 平均位置误差超过 0.5 m；参考 torso 高度减去实际高度超过 0.5 m；或位置／姿态误差非有限。高度判据是单向高度亏损，不是绝对高度差；未另设 torso 姿态角失败阈值。这是跟踪完成判据，不是完备的物理摔倒检测。100% 表示本次所选任务全部通过，不是多随机种子成功概率；该统一判据继承前期对旧 sprint 复测后的修订。

## 评测条件、权重选点与论文表述

实测评估关闭随机 DR、观测噪声、随机初始扰动和外部推力，执行确定性策略；保留配置中的固定控制延迟。各方法在原生仿真后端运行，再使用统一离线指标计算。相同公式并不消除动力学、策略输入、参考重定向、物体与地形场景差异；详见[实测报告与评测证据](/home/user/ws/tmp/Unilab3/UniLab/artifacts/motion_tracking_6run/four_repo_6motion_extended_precision_report.md)。

原 UniLab/FlashSAC 行固定使用每动作 17.5k 权重；延长训练参考行由已保存候选按成功执行和最低 Body MPJPE-r 扫描，再在独立进程复核后选取单个 checkpoint。五动作参考节点依次为 dance 45k、walk 47.5k、run 85k、flip 37.5k、carry 70k。它不是全训练过程最优的证明，也不是独立测试集上的无偏选点。其余三仓库沿用子表列出的既有节点，**本版没有采用统一的“峰值 reward 95%”选点规则或共同精度阈值**。此外，dance 延长训练参考运行的网络／奖励等配置与原 17.5k 运行有差异，不能将其视为完全相同配置的纯延长训练。

$T_{4090}$ 表示从首次 TensorBoard writer 建立到所列评测节点的训练时间，排除 writer 前的进程／环境初始化；不是完整进程端到端 walltime。续训参考运行按权重分支重建，去掉段间等待和续训启动／重编译波动，部分首更新开销使用稳态更新间隔估计。D 为直接记录；旧基线 E 为同动作硬件速率折算、P 为跨动作时间估计；延长训练行 E 则表示续训重建，并非硬件折算。BeyondMimic 主表 144.97 min 为成功四动作本地 4090 直接记录。其余行的估计或重建时间不能写为全量直接实测，也不能据此宣称达到同一精度阈值的加速比。

可用于论文方法部分的简要文字（仅描述实测部分）：

> 我们通过完整参考动作的确定性回放评估运动跟踪性能，关闭域随机化、观测噪声和外部扰动。全局误差以 torso 世界坐标位置的平均欧氏距离衡量；局部身体姿态及四末端误差在逐帧 torso 平移与相对航向对齐后计算，姿态误差采用四元数测地角。各指标先对帧和相应 link 集合求均值，再按动作等权汇总。五任务集合为 dance、walk、run、flip、carry，成功比例以全部五任务为分母；误差与训练预算报告成功动作条件均值，并列明各方法实际参与的动作及分母。训练预算对应表列评测权重，直接计时与估计计时分别标注。

本版数值可支持的描述为：FlashSAC 在所列五动作参考回放中均通过，固定 17.5k 行的平均训练预算为 8.68 min；增加训练预算后的实测四动作展示了精度变化。各方法成功集合和计时来源不同，不据此宣称五动作实测精度全面领先或等精度训练加速比。
