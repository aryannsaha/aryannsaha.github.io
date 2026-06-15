import { Box } from "@chakra-ui/react";
import { useState } from "react";
import projectsData from "../content/projects/index.json";

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  title: string;
  titleUrl?: string;
  authors: string[];
  venue?: string;
  description: string;
  image?: string;
  links: ProjectLink[];
}

const projects: Project[] = projectsData;
const ME = "Aryan Saha";

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Box
      ml={{ base: 0, lg: "-15%" }}
      width={{ base: "100%", lg: "130%" }}
      sx={{
        "& a": { color: "#1772d0", textDecoration: "none" },
        "& a:hover": { color: "#f09228" },
        "& p": { margin: "4px 0" },
      }}
    >
      <table
        style={{
          width: "100%",
          fontFamily: "Garamond, 'Times New Roman', Times, serif",
          fontSize: "14px",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          {projects.map((project, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: hovered === i ? "#ffffd0" : "transparent",
                transition: "background-color 0.1s",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <td style={{ padding: "16px", width: "20%", verticalAlign: "middle", textAlign: "center" }}>
                {project.image && (
                  <div style={{ width: "160px", margin: "0 auto" }}>
                    <img src={project.image} style={{ width: "100%" }} alt={project.title} />
                  </div>
                )}
              </td>
              <td style={{ padding: "8px", width: "80%", verticalAlign: "middle" }}>
                {project.titleUrl ? (
                  <a href={project.titleUrl}>
                    <span style={{ fontWeight: 700, fontSize: "16px" }}>{project.title}</span>
                  </a>
                ) : (
                  <span style={{ fontWeight: 700, fontSize: "16px" }}>{project.title}</span>
                )}
                <br />
                {project.authors.map((author, j) => (
                  <span key={author}>
                    {j > 0 && ", "}
                    {author === ME ? <strong>{author}</strong> : author}
                  </span>
                ))}
                {project.venue && (
                  <>
                    <br />
                    <em>{project.venue}</em>
                  </>
                )}
                <p />
                <p style={{ fontSize: "13px", lineHeight: "1.4", marginTop: "2px" }}>{project.description}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
