export type ExperienceEntry = {
  id: string;
  org: string;
  role: string;
  period: string;
  location: string;
  field?: string;
  points: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "ahomlama",
    org: "AHOMLAMA",
    role: "Computer Vision / AI-ML Engineer Intern",
    period: "Aug 2026 – Present",
    location: "On-site",
    points: [
      "Working on real-time computer vision and edge AI systems for defence technology applications",
      "Contributing to an AI-based Detection & Classification System using a multi-stage pipeline — YOLO for detection, ConvNeXt for classification",
      "Contributing to confidence-based validation and out-of-distribution (OOD) detection to improve prediction reliability",
      "Working with day and night datasets across varying illumination conditions",
      "Deploying and testing AI inference on NVIDIA Jetson edge devices, Linux/Ubuntu systems and workstations",
      "Working with RTSP/IP-stream and thermal cameras for real-time acquisition and processing",
      "Supporting camera monitoring — failover, obstruction detection, recording, logging and system status",
      "Integrating AI systems with PLC-controlled systems over TCP/IP and Ethernet for automated workflows",
      "Operating in a fully offline environment — local datasets, local inference, local monitoring, no internet dependency",
    ],
  },
  {
    id: "adrde",
    org: "ADRDE — DRDO",
    role: "Artificial Intelligence Intern",
    period: "Jan 2026 – Jul 2026",
    location: "Agra, India · On-site",
    points: [
      "Developed and tested computer vision components for defence-related monitoring using Python, OpenCV and image processing",
      "Contributed to a camera-based Aircraft Arrester Barrier Height Measurement System for runway safety",
      "Implemented ArUco marker-based reference detection to estimate barrier net height from long-range camera feeds",
      "Built modular Python components for frame processing, marker detection, measurement and warning logic",
      "Tested and optimized the system in Linux/Ubuntu environments, focused on reliability and real-time performance",
    ],
  },
  {
    id: "iit-jammu",
    org: "IIT Jammu",
    role: "Summer Research Intern",
    period: "Jun 2026 – Jul 2026",
    location: "Remote",
    field: "Adversarial Robustness & AI Security",
    points: [
      "Studied GAN-based adversarial attacks and their impact on deep learning image classification systems",
      "Researched model extraction and adversarial attack approaches including DFME, Knockoff Nets and JBDA",
      "Conducted controlled experiments using local models and open datasets",
      "Prepared technical reports, implementation notes and experimental documentation",
    ],
  },
];
