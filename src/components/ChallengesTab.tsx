import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { challenges } from '@/data/mockData';
import { AlertTriangle, XCircle, CheckCircle2, Cpu } from 'lucide-react';

export function ChallengesTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Project Challenges</h2>
        <p className="mt-2 text-muted-foreground">
          Key technical challenges and how I'll solve them
        </p>
      </div>

      <div className="grid gap-6">
        {challenges.map((challenge, index) => (
          <Card key={challenge.id} className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    {challenge.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid gap-0 md:grid-cols-4">
                {/* Problem */}
                <div className="border-b p-4 md:border-b-0 md:border-r">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    Problem
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.problem}</p>
                </div>

                {/* Why Teams Fail */}
                <div className="border-b p-4 md:border-b-0 md:border-r">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-600">
                    <XCircle className="h-4 w-4" />
                    Why Teams Fail
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.whyTeamsFail}</p>
                </div>

                {/* My Solution */}
                <div className="border-b p-4 md:border-b-0 md:border-r">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    My Solution
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.solution}</p>
                </div>

                {/* Tech Used */}
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Cpu className="h-4 w-4" />
                    Tech Used
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {challenge.techUsed.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
