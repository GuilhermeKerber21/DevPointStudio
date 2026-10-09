# Revisão de acessibilidade — 9 de outubro de 2026

A revisão cobre o HTML, o conteúdo gerado por JavaScript e os principais estados interativos. Testes automáticos não certificam acessibilidade completa nem substituem o uso de leitores de tela.

## Correções

- Seções identificadas pelos títulos, um único H1 e destino do link de pular conteúdo com foco programático.
- Listas identificadas explicitamente e imagens redundantes da marca sem repetição de texto alternativo.
- Cubo como botão nativo, operável por Enter e Espaço, com nome acessível traduzido. O canvas e a escrita decorativa não duplicam o nome da marca na leitura.
- FAQ com títulos de nível 3, botões com estado expandido e respostas fechadas removidas da leitura e da navegação.
- Menu mobile com conteúdo de fundo inativo, foco no primeiro link, ciclo de Tab dentro do cabeçalho e Escape para fechar e devolver o foco.
- Projetos com links reais, sem botão dentro de outro controle. Cartões fora da frente ficam fora da leitura e do teclado. Seleção do projeto anunciada pelo estado do botão.
- Projetos continuam disponíveis como lista estática quando a biblioteca de animação não carrega.
- O carrossel para ao receber foco ou passar o mouse. Preferência do sistema por movimento reduzido respeitada. O botão de pausar animações foi removido posteriormente por solicitação do usuário.
- Cores e espaçamento dos ícones do rodapé restaurados posteriormente por solicitação do usuário. Conteúdo focado fica visível mesmo antes da animação de entrada.
- Idioma do documento e nomes dos controles atualizados na troca PT/EN.

## Testes reproduzíveis

As dependências de teste ficam em `tests/`, separadas das dependências do site:

```powershell
npm.cmd --prefix tests ci
node tests/accessibility.mjs
```

O teste utiliza o Chrome instalado em `C:/Program Files/Google/Chrome/Application/chrome.exe`. Ajuste `executablePath` caso esteja instalado em outro local.

O roteiro valida HTML com html-validate; executa axe-core em desktop PT/EN, mobile PT/EN, menu aberto e movimento reduzido; verifica FAQ, seleção de projetos, foco do menu, Escape e transformação/reconstrução do cubo pelo teclado. Usa um servidor local temporário e fecha o navegador ao terminar. Recursos externos do site precisam estar disponíveis para testar as animações.

Resultado da auditoria inicial: HTML válido nas regras executadas, zero violações do axe-core nos seis estados testados e testes de interação aprovados. Após a restauração das cores anteriores e a remoção do botão de pausa, esse resultado não representa integralmente a versão atual. O teste mantém a verificação de contraste e pode apontar novamente os problemas das cores originais. A possibilidade de interromper todos os movimentos automáticos também permanece como pendência de acessibilidade. Isso não é uma certificação WCAG.

## Validação manual ainda necessária

- Com NVDA no Windows e VoiceOver no iOS: navegar por títulos, regiões, listas e links, conferir pronúncia e leitura das descrições.
- Percorrer a página somente com Tab, Shift+Tab, Enter, Espaço e Escape, incluindo o link de pular conteúdo e os links sociais.
- Conferir reflow com zoom de 200% e 400%, orientação horizontal, tamanhos de fonte ampliados e dispositivos reais.
- Confirmar a compreensão do conteúdo e a qualidade dos textos alternativos com pessoas que utilizam tecnologia assistiva.
- Inspecionar contraste e indicadores de foco em todos os estados visuais e imagens; testes automáticos nem sempre medem pixels e gradientes corretamente.

Referências: [padrão de acordeão da W3C](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) e [padrão de carrossel da W3C](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).
