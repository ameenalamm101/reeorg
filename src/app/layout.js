import "./globals.css";

export const metadata = {
  title: "ReeOrg – Business & Workforce Intelligence for the Post-AI Era",
  description:
    "ReeOrg empowers HR leaders with real-time org visualization, risk identification, and workforce design. Stay ahead of transformation and AI disruption with dynamic business and workforce intelligence.",
  keywords: [
    "ReeOrg",
    "Workforce Intelligence",
    "Org Design",
    "HR Analytics",
    "AI Disruption HR",
    "Talent Strategy",
    "CHRO Tools",
    "HRBP",
    "Future of Work",
    "Organizational Visualization",
    "Skills Mapping",
    "Attrition Risk",
    "Upskilling",
    "Business Transformation",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
      </head>
      <body>{children}</body>
    </html>
  );
}
