import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppDemo } from '@/components/demo/AppDemo';
import { ChallengesTab } from '@/components/ChallengesTab';
import { ProposalTab } from '@/components/ProposalTab';
import { Smartphone, Code2, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Barcode Reader App Modernization
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Interactive Proposal Demo
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="app" className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="app" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">App Demo</span>
              <span className="sm:hidden">Demo</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span className="hidden sm:inline">Challenges</span>
              <span className="sm:hidden">Tech</span>
            </TabsTrigger>
            <TabsTrigger value="proposal" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Proposal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="app" className="mt-0">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold md:text-3xl">Interactive Demo</h2>
              <p className="mt-2 text-muted-foreground">
                Experience the modernized barcode scanning flow
              </p>
            </div>
            <AppDemo />
          </TabsContent>

          <TabsContent value="challenges" className="mt-0">
            <ChallengesTab />
          </TabsContent>

          <TabsContent value="proposal" className="mt-0">
            <ProposalTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with React, TypeScript, Tailwind CSS & shadcn/ui</p>
          <p className="mt-1">Humam Al Rubaye | Available for immediate start</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
