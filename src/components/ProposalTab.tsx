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
  ArrowRight
} from 'lucide-react';
import { experiences, timeline, contactInfo } from '@/data/mockData';

export function ProposalTab() {
  return (
    <div className="space-y-8">
      {/* Understanding Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Understanding Your Problem</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">
              Straw House Tickets needs to modernize their existing barcode reader application to meet growing demands and improve event check-in efficiency.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                'Modernize existing barcode reader mobile app',
                'Add QR code scanning capability',
                'Integrate commercial barcode reader support',
                'Maintain iOS & Android feature parity',
                'Improve offline functionality',
                'Optimize check-in speed for high-volume events',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Solution Approach Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Solution Approach</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">
              I'll take an incremental modernization approach—improving the existing codebase while adding new features, ensuring stability throughout the process.
            </p>
            <div className="space-y-3">
              {[
                'Audit existing code and establish testing baseline',
                'Implement unified camera/reader abstraction layer',
                'Add QR code support with native camera APIs',
                'Integrate HID device support for commercial readers',
                'Implement local-first architecture for offline resilience',
                'Optimize scan-to-confirm flow for sub-2-second performance',
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

      {/* Timeline Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Timeline</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {timeline.map((phase, index) => (
            <Card key={phase.phase} className="relative">
              {index < timeline.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-muted-foreground md:block" />
              )}
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit">{phase.duration}</Badge>
                <CardTitle className="text-lg">{phase.phase}</CardTitle>
                <CardDescription className="font-medium">{phase.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Relevant Experience</h2>
        </div>
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
                  Mobile & Web Developer | Available for immediate start
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
    </div>
  );
}
