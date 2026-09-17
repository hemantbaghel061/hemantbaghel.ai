"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectVisual({ type }: { type: Project["visual"] }) {
  switch (type) {
    case "acs":
      return (
        <div className="relative h-full w-full">
          <Image
            src="/images/projects/fighter-jet.webp"
            alt="Aircraft in flight, illustrating the detection and classification target for this system"
            fill
            className="object-cover opacity-60"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/30 to-graphite/50" />
          <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full">
            <rect
              x="70"
              y="50"
              width="180"
              height="110"
              fill="none"
              stroke="#4e7cff"
              strokeOpacity="0.8"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.5;1;0.5"
                dur="2.6s"
                repeatCount="indefinite"
              />
            </rect>
            <text x="70" y="44" fill="#4e7cff" fontSize="11" fontFamily="monospace">
              YOLO → CONVNEXT
            </text>
            <rect x="270" y="60" width="110" height="60" fill="none" stroke="#f5f3ee" strokeOpacity="0.35" />
            <text x="276" y="76" fill="#f5f3ee" fillOpacity="0.8" fontSize="9" fontFamily="monospace">
              CONF: 0.9x
            </text>
            <text x="276" y="90" fill="#f5f3ee" fillOpacity="0.8" fontSize="9" fontFamily="monospace">
              OOD: CLEAR
            </text>
            <text x="276" y="104" fill="#f5f3ee" fillOpacity="0.5" fontSize="9" fontFamily="monospace">
              EDGE: JETSON
            </text>
            <text x="94" y="190" fill="#f5f3ee" fillOpacity="0.6" fontSize="10" fontFamily="monospace">
              PLC.LINK / ACTIVE
            </text>
          </svg>
        </div>
      );
    case "aircraft":
      return (
        <div className="relative h-full w-full">
          <Image
            src="/images/projects/arrester-barrier.webp"
            alt="Simulated runway scene showing an aircraft and the arrester barrier net measured by this system"
            fill
            className="object-cover opacity-75"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/20 to-graphite/40" />
          <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full">
            <line x1="0" y1="200" x2="400" y2="200" stroke="#f5f3ee" strokeOpacity="0.25" strokeWidth="1" />
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={i}
                x1={i * 44}
                y1="196"
                x2={i * 44}
                y2="204"
                stroke="#f5f3ee"
                strokeOpacity="0.25"
              />
            ))}
            <rect
              x="90"
              y="55"
              width="220"
              height="120"
              fill="none"
              stroke="#4e7cff"
              strokeOpacity="0.7"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.4;0.9;0.4"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>
            <text x="94" y="48" fill="#4e7cff" fontSize="11" fontFamily="monospace">
              BARRIER HEIGHT: 4.82m
            </text>
            <text x="94" y="190" fill="#f5f3ee" fillOpacity="0.7" fontSize="10" fontFamily="monospace">
              MARKER.SCALE / LOCKED
            </text>
          </svg>
        </div>
      );
    case "safetag":
      return (
        <div className="relative h-full w-full">
          <Image
            src="/images/projects/safetag.webp"
            alt="SafeTag web interface alongside QR safety tags on a collar, wristband, luggage tag and key fob"
            fill
            className="object-cover opacity-75"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/25 to-graphite/45" />
          <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full">
            <rect
              x="150"
              y="70"
              width="100"
              height="100"
              fill="none"
              stroke="#4e7cff"
              strokeOpacity="0.8"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.35;0.95;0.35"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </rect>
            <text x="150" y="64" fill="#4e7cff" fontSize="11" fontFamily="monospace">
              QR.SCAN
            </text>
            <text x="150" y="190" fill="#f5f3ee" fillOpacity="0.75" fontSize="10" fontFamily="monospace">
              SCAN.STATUS / VERIFIED
            </text>
          </svg>
        </div>
      );
    case "yolo":
      return (
        <div className="relative h-full w-full">
          <Image
            src="/images/projects/yolo-detection.webp"
            alt="YOLOv5 detection output on a street scene with labelled bounding boxes around cars, a truck, a person, bicycles and a traffic light"
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-transparent to-graphite/40" />
          <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full">
            <text x="20" y="28" fill="#4e7cff" fontSize="11" fontFamily="monospace">
              YOLOV5 / INFERENCE
            </text>
            <text x="20" y="214" fill="#f5f3ee" fillOpacity="0.75" fontSize="10" fontFamily="monospace">
              12 OBJECTS DETECTED
            </text>
          </svg>
        </div>
      );
    default:
      return null;
  }
}
