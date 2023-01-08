class Graph:
    """
    Um grafo representado por uma lista de arestas.
    """
    edges = []
    vertices = []

    def __init__(self):
        pass

    def add_edge(self, a, b, weight):
        """
        Une dois vértices por uma aresta de peso especificado.\n
        Se um dos vértices não pertencer ao grafo, adiciona-o ao grafo.
        """
        if a not in self.vertices:
            self.vertices.append(a)
        
        if b not in self.vertices:
            self.vertices.append(b)
        
        self.edges.append((a, b, weight))

    def read_graph(self, path):
        """
        Constrói um grafo a partir da lista de arestas em um arquivo.\n
        No arquivo, cada valor deve ser separado por um único espaço.
        """
        with open(path, 'r') as f:
            edges = f.read().splitlines()
            for edge in edges:
                a, b, weight = edge.split(' ')
                self.add_edge(a, b, int(weight))