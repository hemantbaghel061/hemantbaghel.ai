export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  filterTags: string[];
  tech: string[];
  year: string;
  description: string;
  visual: "acs" | "aircraft" | "safetag" | "yolo";
  github?: string;
  overview: string;
  problem: string;
  approach: string;
  system: string[];
  result: string;
  lessons: string;
};

export const projects: Project[] = [
  {
    id: "acs",
    index: "01",
    title: "Aircraft Classification System (ACS)",
    category: "Edge AI / Real-Time Computer Vision",
    filterTags: ["AI", "COMPUTER VISION", "SYSTEMS"],
    tech: [
      "Python",
      "YOLO",
      "ConvNeXt",
      "PyTorch",
      "NVIDIA Jetson",
      "RTSP",
      "Thermal Cameras",
      "PLC",
      "TCP/IP",
      "Ethernet",
    ],
    year: "2026 — ongoing",
    description:
      "A real-time aircraft detection and classification system for defence technology applications, built on a two-stage pipeline and deployed on edge hardware.",
    visual: "acs",
    overview:
      "An ongoing project at AHOMLAMA building a real-time system that detects aircraft in a camera feed and then classifies them, running on edge hardware rather than a cloud server, in a fully offline environment.",
    problem:
      "Defence-adjacent monitoring needs detection that works locally, in real time, under day and night conditions, and degrades safely when the model is uncertain rather than guessing with false confidence.",
    approach:
      "A two-stage pipeline separates concerns: YOLO handles detection first, then a ConvNeXt classifier identifies the aircraft. Confidence scoring and out-of-distribution (OOD) checks flag uncertain predictions instead of forcing a classification, and the system is trained and evaluated across both day and night datasets.",
    system: [
      "RTSP / THERMAL FEED",
      "YOLO DETECTION",
      "CONVNEXT CLASSIFICATION",
      "CONFIDENCE / OOD CHECK",
      "PLC / TCP-IP INTEGRATION",
      "LOGGING & MONITORING",
    ],
    result:
      "An in-progress system currently deployed for testing on NVIDIA Jetson edge devices and workstations, with camera failover, obstruction detection, recording and logging already integrated alongside the detection pipeline.",
    lessons:
      "Edge deployment changes the brief entirely — a model that performs well in a notebook still has to survive intermittent camera feeds, offline operation, and hardware constraints, which is where confidence and OOD handling started to matter as much as raw accuracy.",
  },
  {
    id: "arrester-barrier",
    index: "02",
    title: "Smart Aircraft Arrester Barrier Height Measurement System",
    category: "Computer Vision / Real-Time AI",
    filterTags: ["AI", "COMPUTER VISION", "SYSTEMS"],
    tech: ["Python", "OpenCV", "ArUco Markers", "RTSP / IP Camera", "Linux"],
    year: "2026",
    description:
      "A camera-based computer vision system for monitoring aircraft arrester barrier net height, using ArUco reference markers and real-time frame processing, built during an internship at ADRDE (DRDO).",
    visual: "aircraft",
    overview:
      "A real-time visual measurement system for runway safety applications, developed during an internship at ADRDE (DRDO). A fixed camera observes the barrier net and continuously reports its height.",
    problem:
      "Arrester barrier height needs to be verified quickly and repeatably before aircraft operations — manual measurement is slow and hard to standardize under field conditions.",
    approach:
      "ArUco markers with known real-world spacing sit in the camera's field of view alongside the barrier. Their known geometry lets the system convert pixel measurements into physical units without manual recalibration.",
    system: [
      "IP CAMERA",
      "FRAME PROCESSING",
      "MARKER DETECTION",
      "SCALE CALIBRATION",
      "HEIGHT MEASUREMENT",
      "WARNING / VISUALIZATION",
    ],
    result:
      "A tested prototype that estimates barrier height from IP camera, RTSP and webcam input in a Linux/Ubuntu deployment, with warning logic for unsafe height conditions.",
    lessons:
      "Reference-marker calibration is a reliable way to bring metric measurement to an uncalibrated camera — precision depended more on marker placement and lighting stability than on the detection logic itself.",
  },
  {
    id: "safetag",
    index: "03",
    title: "SafeTag — QR Emergency Safety Platform",
    category: "Full-Stack / Safety Platform",
    filterTags: ["WEB", "SYSTEMS"],
    tech: ["Python", "Django", "SQLite", "Bootstrap", "JavaScript", "QR Code"],
    year: "2025",
    description:
      "A QR-based emergency safety platform supporting vehicles, children, pets, luggage and personal safety — connecting a physical tag to emergency contacts, SOS alerts and permission-based location sharing.",
    visual: "safetag",
    github: "https://github.com/hemantbaghel061/safetag_prod",
    overview:
      "SafeTag links a physical QR tag to a digital emergency profile, with an admin-controlled inventory and activation workflow for managing the tags themselves.",
    problem:
      "In an emergency, bystanders often have no fast way to reach the right contacts or know critical information — and people are reasonably reluctant to expose personal data by default.",
    approach:
      "Public scanning surfaces emergency contacts, SOS alerts and medical information under permission-based rules, while a dashboard handles QR management, activation status, scan logs and SOS incident tracking.",
    system: [
      "QR TAG",
      "SCAN",
      "PERMISSION CHECK",
      "EMERGENCY PROFILE",
      "SOS + LOCATION (OPT-IN)",
      "DASHBOARD / LOGS",
    ],
    result:
      "A working full-stack platform covering tag activation, public scanning, SOS workflows, and dashboard-side incident tracking, built end-to-end on Django.",
    lessons:
      "Designing for privacy by default changes the data model from day one — access control had to be a first-class concept, not something bolted on after the schema was fixed.",
  },
  {
    id: "yolo-vision",
    index: "04",
    title: "YOLOv5 Web Object Detection Application",
    category: "Object Detection",
    filterTags: ["AI", "COMPUTER VISION", "WEB"],
    tech: ["Python", "YOLOv5", "Flask", "OpenCV"],
    year: "2024",
    description:
      "A Flask-based web application for image-based object detection, integrating YOLOv5 inference with OpenCV for bounding-box visualization.",
    visual: "yolo",
    github: "https://github.com/hemantbaghel061/yolov5-webapp",
    overview:
      "A lightweight Flask application that wraps a YOLOv5 model behind an upload-and-detect interface, with an interactive interface for viewing results.",
    problem:
      "Running inference with a detection model usually requires setting up an environment — a browser-based interface removes that friction for quick testing and demonstration.",
    approach:
      "An uploaded image is passed to a YOLOv5 model server-side; OpenCV draws the resulting bounding boxes back onto the image before it's returned to the browser.",
    system: [
      "IMAGE UPLOAD",
      "PREPROCESS",
      "YOLOV5 INFERENCE",
      "BOUNDING BOX DRAW",
      "RESULT RENDER",
    ],
    result:
      "A working web app that performs object detection on user-submitted images and returns annotated results in the browser.",
    lessons:
      "Serving a vision model well is as much about the request/response plumbing and image handling as it is about the model itself.",
  },
];
