import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { TokenTable } from '@/components/TokenTable/TokenTable';
import { Activity } from 'lucide-react';

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Token Discovery</h1>
                <p className="text-sm text-muted-foreground">Real-time crypto market insights</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <TokenTable />
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>Production-ready token discovery platform with real-time updates</p>
          </div>
        </footer>
      </div>
    </Provider>
  );
};

export default Index;
