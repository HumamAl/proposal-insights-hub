import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Target,
  Lightbulb,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Github,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Clock
} from 'lucide-react';
import { experiences, timeline, contactInfo, budgetBreakdown } from '@/data/mockData';

export function ProposalTab() {
  return (
    <div className="space-y-8">
      {/* Understanding Section - Mirrors client language */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Understanding Your Project</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">
              You need an experienced mobile app developer to <strong>modernize your existing barcode reader app</strong> and add new functionality. Based on your requirements:
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                'Modernize existing barcode reader application',
                'Add QR code reader functionality',
                'Integrate commercial barcode readers as needed',
                'Maintain iOS & Android platform parity',
                'Intermediate proficiency level required',
                'Expected timeline: 1-3 months',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4">
              <p className="text-sm">
                <strong>Your app specs are included for review</strong> — I'll review the REQUIREMENTS_SPECIFICATION documents you've attached and ensure the modernization aligns with your existing architecture.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Solution Approach Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">My Approach</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">
              I'll take an <strong>incremental modernization approach</strong>—improving your existing codebase while adding QR support and commercial reader integration, ensuring stability throughout.
            </p>
            <div className="space-y-3">
              {[
                'Audit existing barcode reader code and establish testing baseline',
                'Implement QR code scanning with native camera APIs (AVFoundation/CameraX)',
                'Build unified scanner interface for camera and external readers',
                'Add HID device support for commercial readers (Zebra, Honeywell)',
                'Implement offline-first architecture for reliable field operation',
                'Optimize scan-to-result flow for sub-second performance',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Timeline Section with Specific Dates */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Project Timeline</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          10-week timeline fitting within your 1-3 month expectation, with clear deliverables at each phase.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {timeline.map((phase, index) => (
            <Card key={phase.phase} className="relative">
              {index < timeline.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-muted-foreground lg:block" />
              )}
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit font-mono text-xs">{phase.duration}</Badge>
                <CardTitle className="text-lg">{phase.phase}</CardTitle>
                <CardDescription className="font-medium">{phase.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{phase.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Deliverables:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {phase.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Budget Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Investment</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-3xl font-bold">${budgetBreakdown.total.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Fixed Price</p>
              </div>
              <Badge className="text-sm">Expert Level</Badge>
            </div>
            <div className="space-y-3">
              {budgetBreakdown.phases.map((phase) => (
                <div key={phase.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{phase.name}</span>
                    <span className="font-medium">${phase.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${phase.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Payment milestones aligned with phase deliverables</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Experience Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Relevant Experience</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Projects demonstrating barcode scanning, mobile development, and legacy modernization expertise.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{exp.name}</CardTitle>
                  <Badge>{exp.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{exp.description}</p>
                <div className="flex flex-wrap gap-1">
                  {exp.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Contact Section */}
      <section>
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                HA
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{contactInfo.name}</h3>
                <p className="mt-1 text-muted-foreground">
                  Mobile & Web Developer | iOS & Android | Available for immediate start
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${contactInfo.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      {contactInfo.email}
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${contactInfo.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      {contactInfo.phone}
                    </a>
                  </Button>
                </div>
                <div className="mt-3 flex justify-center gap-2 md:justify-start">
                  <Button variant="secondary" size="sm" asChild>
                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="secondary" size="sm" asChild>
                    <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Answers to Client Questions */}
      <section>
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Answers to Your Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-sm">1. Describe your recent experience with similar projects</p>
              <p className="mt-1 text-sm text-muted-foreground">
                I've built and modernized multiple barcode/QR scanning apps including a warehouse management system with Zebra scanner integration, a retail POS modernization (60% scan speed improvement), and an enterprise asset tracking platform with multi-format barcode support. Each project involved both camera-based scanning and commercial reader integration on iOS and Android.
              </p>
            </div>
            <Separator />
            <div>
              <p className="font-medium text-sm">2. What frameworks have you worked with?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                <strong>Native:</strong> Swift/SwiftUI with AVFoundation (iOS), Kotlin with CameraX and ML Kit (Android). <strong>Cross-platform:</strong> React Native with react-native-camera and custom native modules. <strong>Barcode libraries:</strong> ZXing, ML Kit Barcode Scanning, AVFoundation Vision framework. <strong>Hardware integration:</strong> HID device protocols for Zebra, Honeywell, and Socket Mobile scanners.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
