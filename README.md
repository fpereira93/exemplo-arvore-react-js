Exemplo de um arquivo `data.json` contendo os dados para renderizar a árvore. A estrutura de um único item é esta:

```
 "1": {
    "id": "a853dddc-b639-41e6-a876-958b1e7f65d1",
    "name": "Harald Svante August",
    "children": {}
  }
```

##### Comportamento:
- Para cada item, o usuário deve poder marcar o checkbox dessa linha. 
- Para cada item que tenha filhos (ou seja, um item pai), quando o usuário marcar ou desmarcar o checkbox, o estado deve ser cascateado a todos os seus descendentes. 
- Para cada item que seja um item pai, o usuário deve ser capaz de mostrar ou esconder os itens internos.

##### Resultado final:
 ![Resultado final](tree.gif?raw=true "Resultado final do exemplo")
