import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pins the workspace root to this folder. Without this, Turbopack scans
  // upward for lockfiles and — on Windows setups where the user profile
  // path contains a space (e.g. "C:\Users\This PC\...") or where OneDrive
  // syncs the Desktop — it can pick the wrong root and print a "ignored
  // package-lock.json ... because it would include your home directory"
  // warning. Harmless, but this silences it and makes builds deterministic.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
