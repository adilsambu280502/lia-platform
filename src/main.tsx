import { StrictMode, Component, ReactNode, ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

// Inicializar Instalação PWA silenciosa e atualizações Ota (Over-the-Air)
if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

import App from './App.tsx';
import './index.css';
import './i18n';

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  
  componentDidCatch(error: Error, info: ErrorInfo) { 
    console.error("Caught:", error, info); 
    // Auto-reload once for chunk loading errors resulting from deployments
    const msg = error.message || '';
    if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Importing a module script failed')) {
      if (!sessionStorage.getItem('lia_did_reload')) {
        sessionStorage.setItem('lia_did_reload', 'true');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', backgroundColor: '#e31e24', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Atualização do Sistema</h1>
          <p style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '500px', lineHeight: '1.5', opacity: 0.9 }}>
            Lançámos uma nova versão da plataforma enquanto navegava. Clique no botão abaixo para recarregar a versão mais recente e continuar.
          </p>
          <button 
            onClick={() => {
              sessionStorage.removeItem('lia_did_reload');
              window.location.reload();
            }} 
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: 'white', color: '#e31e24', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}
          >
            Recarregar Plataforma
          </button>
          
          <div style={{ marginTop: '4rem', opacity: 0.4, fontSize: '0.8rem', width: '100%', maxWidth: '600px' }}>
            <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '12px', overflowX: 'auto', textAlign: 'left' }}>
              {this.state.error?.toString()}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
