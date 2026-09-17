"use client";

import { useState } from "react";

const pipeline = [
  { id: "image", label: "Image", note: "Raw frame captured from a camera source." },
  {
    id: "preprocess",
    label: "Preprocess",
    note: "Resize, normalize, and denoise before the frame reaches a model.",
  },
  {
    id: "model",
    label: "Model",
    note: "A trained network (e.g. YOLOv8) evaluates the processed frame.",
  },
  {
    id: "inference",
    label: "Inference",
    note: "Raw model output — boxes, classes, confidences — before filtering.",
  },
  {
    id: "decision",
    label: "Decision",
    note: "Thresholds and logic turn inference into an action or a measurement.",
  },
];

const detections = [
  { label: "PERSON", conf: 98 },
  { label: "AIRCRAFT", conf: 97 },
  { label: "VEHICLE", conf: 94 },
];

export default function Lab() {
  const [activeNode, setActiveNode] = useState(pipeline[2].id);
  const active = pipeline.find((p) => p.id === activeNode)!;

  return (
    <section id="lab" className="border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display text-4xl md:text-5xl">The lab</h2>
        <p className="mt-3 max-w-md text-mist">
          Experiments, systems and ideas in progress.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* AI pipeline */}
          <div className="border border-line bg-surface p-6 lg:col-span-2">
            <p className="font-mono text-[11px] text-mist">AI PIPELINE</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {pipeline.map((node, i) => (
                <span key={node.id} className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveNode(node.id)}
                    className={`border px-3 py-2 font-mono text-xs transition-colors ${
                      activeNode === node.id
                        ? "border-signal text-signal"
                        : "border-line text-mist hover:text-bone"
                    }`}
                  >
                    {node.label}
                  </button>
                  {i < pipeline.length - 1 && (
                    <span className="text-line">→</span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-6 min-h-[2.5rem] max-w-md text-sm text-mist">
              {active.note}
            </p>
          </div>

          {/* Object detection readout */}
          <div className="border border-line bg-surface p-6">
            <p className="font-mono text-[11px] text-mist">OBJECT DETECTION</p>
            <div className="mt-6 space-y-3">
              {detections.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-bone">{d.label}</span>
                    <span className="text-signal">{d.conf}%</span>
                  </div>
                  <div className="mt-1 h-1 w-full bg-line">
                    <div
                      className="h-1 bg-signal"
                      style={{ width: `${d.conf}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Depth map */}
          <div className="border border-line bg-surface p-6">
            <p className="font-mono text-[11px] text-mist">DEPTH</p>
            <div className="mt-6 grid grid-cols-8 gap-[2px]">
              {Array.from({ length: 64 }).map((_, i) => {
                const x = i % 8;
                const y = Math.floor(i / 8);
                const d = Math.sqrt((x - 4) ** 2 + (y - 4) ** 2);
                const opacity = Math.max(0.08, 1 - d / 6);
                return (
                  <div
                    key={i}
                    className="aspect-square bg-signal"
                    style={{ opacity }}
                  />
                );
              })}
            </div>
          </div>

          {/* Camera feed sim */}
          <div className="border border-line bg-surface p-6">
            <p className="font-mono text-[11px] text-mist">COMPUTER VISION</p>
            <div className="relative mt-6 h-32 overflow-hidden border border-line">
              <div className="absolute left-4 top-6 h-16 w-12 border border-signal" />
              <div className="absolute right-6 bottom-4 h-10 w-20 border border-signal" />
              <p className="absolute bottom-1 right-1 font-mono text-[9px] text-mist">
                FEED.LIVE
              </p>
            </div>
          </div>

          {/* ArUco */}
          <div className="border border-line bg-surface p-6">
            <p className="font-mono text-[11px] text-mist">ARUCO</p>
            <div className="mt-6 grid grid-cols-4 gap-[3px]">
              {[1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1].map((v, i) => (
                <div
                  key={i}
                  className={`aspect-square ${v ? "bg-bone" : "bg-graphite border border-line"}`}
                />
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] text-mist">
              POSE: X 0.42 / Y 0.18 / Z 1.03
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
