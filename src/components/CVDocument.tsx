import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Standard fonts work out of the box in React PDF.
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    color: '#000000',
  },
  contactInfo: {
    fontSize: 10,
    color: '#555555',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 4,
    marginBottom: 8,
    color: '#000000',
    textTransform: 'uppercase',
  },
  itemGroup: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#000000',
  },
  itemSubtitle: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 10,
  },
  itemDate: {
    fontSize: 10,
    fontFamily: 'Helvetica-Oblique',
  },
  itemDescription: {
    fontSize: 10,
    marginTop: 2,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.6,
  }
});

interface Project {
  title: string;
  techStack: string;
  description: string;
}

interface Experience {
  position: string;
  date: string;
  company: string;
  description: string;
}

interface Skill {
  name: string;
}

interface Certification {
  name: string;
  date: string;
  issuer: string;
}

interface CVDocumentProps {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  certifications: Certification[];
}

const CVDocument: React.FC<CVDocumentProps> = ({ projects, experiences, skills, certifications }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>Zhico Pradita</Text>
          <Text style={styles.contactInfo}>
            Software Engineer / Security Enthusiast | zhicopradita@example.com | linkedin.com/in/zhico-pradita-6763432b2 | github.com/mayleneee01
          </Text>
        </View>

        {experiences && experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experiences.map((exp, idx) => (
              <View key={idx} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemDate}>{exp.date}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDescription}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, idx) => (
              <View key={idx} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.title}</Text>
                </View>
                <Text style={styles.itemSubtitle}>Tech Stack: {proj.techStack}</Text>
                <Text style={styles.itemDescription}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>
              {skills.map(s => s.name).join(' • ')}
            </Text>
          </View>
        )}

        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, idx) => (
              <View key={idx} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{cert.name}</Text>
                  <Text style={styles.itemDate}>{cert.date}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVDocument;
