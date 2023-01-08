from graph import *

def main():
    """
    Cria um grafo e executa o algoritmo de Krukal.
    """
    graph = Graph()
    graph.read_graph('kruskal/edges.txt')

    print(graph.edges)
    print(graph.vertices)

if __name__ == '__main__':
    main()