import Index from "@/pages/Index";
import "@/index.css";

function App() {
  return (
    <div className="w-[400px] p-4 bg-background">
      <h1 className="text-lg font-bold mb-4">Layout Column Ruler</h1>
      <p className="text-sm text-muted-foreground mb-4">
        A régua de colunas está ativa e visível em todas as páginas.
      </p>
      <div className="relative h-[200px] border rounded-lg overflow-hidden bg-muted/20">
        <Index />
      </div>
    </div>
  );
}

export default App;
